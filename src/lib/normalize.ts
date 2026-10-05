import type { Ingredient, NormalizeContext, Recipe } from "@/lib/types";

type RawRecord = Record<string, unknown>;

export function stripId(value: string): string {
  return value.replace(/^#?minecraft:/, "").replace(/^#/, "");
}

export function isPotionCatalogId(id: string): boolean {
  return /^(potion|splash_potion|lingering_potion)_.+/.test(id);
}

export function emptyGrid(): (Ingredient | null)[][] {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

export function toIngredient(raw: unknown, context: NormalizeContext): Ingredient | null {
  if (raw == null) return null;

  if (Array.isArray(raw)) {
    const ids = [
      ...new Set(
        raw.flatMap((part) => {
          const ingredient = toIngredient(part, context);
          if (!ingredient) return [];
          return ingredient.anyOf ?? [ingredient.itemId];
        }),
      ),
    ];
    if (ids.length === 0) return null;
    return { itemId: ids[0]!, ...(ids.length > 1 ? { anyOf: ids } : {}) };
  }

  if (typeof raw === "string") {
    if (raw.startsWith("#")) {
      const tag = stripId(raw);
      const members = context.tags.get(tag) ?? [];
      const preferred = context.display[tag];
      const itemId = preferred && members.includes(preferred) ? preferred : (members[0] ?? tag);
      return { itemId, ...(members.length > 1 ? { anyOf: members } : {}) };
    }
    return { itemId: stripId(raw) };
  }

  if (typeof raw === "object") {
    const record = raw as RawRecord;
    if (typeof record.tag === "string") return toIngredient(`#${record.tag}`, context);
    if (typeof record.item === "string") return toIngredient(record.item, context);
    if (typeof record.id === "string") return toIngredient(record.id, context);
  }

  return null;
}

export function readResult(result: unknown): { itemId: string; count: number } | null {
  if (typeof result === "string") return { itemId: stripId(result), count: 1 };
  if (!result || typeof result !== "object") return null;
  const record = result as RawRecord;
  const id =
    typeof record.id === "string"
      ? record.id
      : typeof record.item === "string"
        ? record.item
        : null;
  if (!id) return null;
  const count = typeof record.count === "number" ? record.count : 1;
  return { itemId: stripId(id), count };
}

export function normalizeShaped(
  id: string,
  json: RawRecord,
  context: NormalizeContext,
): Recipe | null {
  const result = readResult(json.result);
  if (!result) return null;
  const keys = (json.key ?? {}) as Record<string, unknown>;
  const pattern = Array.isArray(json.pattern)
    ? json.pattern.filter((row): row is string => typeof row === "string")
    : [];
  const grid = emptyGrid();

  for (let rowIndex = 0; rowIndex < Math.min(3, pattern.length); rowIndex += 1) {
    const row = pattern[rowIndex] ?? "";
    for (let column = 0; column < Math.min(3, row.length); column += 1) {
      const symbol = row[column];
      if (!symbol || symbol === " ") {
        grid[rowIndex]![column] = null;
        continue;
      }
      grid[rowIndex]![column] = toIngredient(keys[symbol], context);
    }
  }

  return { id, station: "crafting_table", result, grid, shapeless: false };
}

export function gridFromIngredients(ingredients: Ingredient[]): (Ingredient | null)[][] {
  const grid = emptyGrid();
  ingredients.slice(0, 9).forEach((ingredient, index) => {
    grid[Math.floor(index / 3)]![index % 3] = ingredient;
  });
  return grid;
}

export function normalizeShapeless(
  id: string,
  json: RawRecord,
  context: NormalizeContext,
): Recipe | null {
  const result = readResult(json.result);
  if (!result) return null;
  const ingredients = (Array.isArray(json.ingredients) ? json.ingredients : [])
    .map((ingredient) => toIngredient(ingredient, context))
    .filter((ingredient): ingredient is Ingredient => ingredient !== null);

  return {
    id,
    station: "crafting_table",
    result,
    grid: gridFromIngredients(ingredients),
    shapeless: true,
  };
}

export function normalizeTransmute(
  id: string,
  json: RawRecord,
  context: NormalizeContext,
): Recipe | null {
  const result = readResult(json.result);
  const input = toIngredient(json.input, context);
  const material = toIngredient(json.material, context);
  if (!result || !input || !material) return null;
  return {
    id,
    station: "crafting_table",
    result,
    grid: gridFromIngredients([material, input]),
    shapeless: true,
  };
}

const COOKING_METHODS = {
  smelting: "furnace",
  blasting: "blast_furnace",
  smoking: "smoker",
  campfire_cooking: "campfire",
} as const;

export function normalizeCooking(
  id: string,
  json: RawRecord,
  method: keyof typeof COOKING_METHODS,
  context: NormalizeContext,
): Recipe | null {
  const result = readResult(json.result);
  const input = toIngredient(json.ingredient, context);
  if (!result || !input) return null;
  return {
    id,
    station: "furnace",
    result,
    furnace: { input, methods: [COOKING_METHODS[method]] },
  };
}

export function cookingKey(recipe: Recipe): string {
  const input = recipe.furnace?.input;
  if (!input) return recipe.id;
  const accepted = [...(input.anyOf ?? [input.itemId])].sort().join(",");
  return `${recipe.result.itemId}|${recipe.result.count}|${accepted}`;
}

export function mergeCooking(recipes: Recipe[]): Recipe[] {
  const crafting: Recipe[] = [];
  const cooking = new Map<string, Recipe>();

  for (const recipe of recipes) {
    if (!recipe.furnace) {
      crafting.push(recipe);
      continue;
    }
    const key = cookingKey(recipe);
    const existing = cooking.get(key);
    if (!existing?.furnace) {
      cooking.set(key, {
        ...recipe,
        furnace: { input: recipe.furnace.input, methods: [...recipe.furnace.methods] },
      });
      continue;
    }
    for (const method of recipe.furnace.methods) {
      if (!existing.furnace.methods.includes(method)) existing.furnace.methods.push(method);
    }
  }

  return [...crafting, ...cooking.values()];
}

function potionType(contents: unknown): string {
  if (!contents || typeof contents !== "object") return "";
  const record = contents as RawRecord;
  const potions = record.potions ?? record.potion;
  if (typeof potions === "string") return stripId(potions);
  if (Array.isArray(potions) && typeof potions[0] === "string") return stripId(potions[0]);
  return "";
}

export function normalizeBrewing(id: string, json: RawRecord): Recipe | null {
  const input = json.input as RawRecord | undefined;
  const output = json.output as RawRecord | undefined;
  const reagent = json.reagent as RawRecord | string | undefined;
  const containerIn = typeof input?.item === "string" ? stripId(input.item) : "";
  const potionIn = potionType(input?.potion_contents);
  const reagentId =
    typeof reagent === "string"
      ? stripId(reagent)
      : typeof reagent?.item === "string"
        ? stripId(reagent.item)
        : "";
  const containerOut = typeof output?.id === "string" ? stripId(output.id) : "";
  const components = output?.components as RawRecord | undefined;
  const potionOut = potionType(components?.["minecraft:potion_contents"]);
  if (!containerIn || !potionIn || !reagentId || !containerOut || !potionOut) return null;

  return {
    id,
    station: "brewing_stand",
    result: { itemId: `${containerOut}_${potionOut}`, count: 1 },
    brewing: {
      base: { itemId: `${containerIn}_${potionIn}` },
      ingredient: { itemId: reagentId },
    },
  };
}

export function fitsInInventory(grid: (Ingredient | null)[][]): boolean {
  let minRow = 3;
  let maxRow = -1;
  let minColumn = 3;
  let maxColumn = -1;

  grid.forEach((row, rowIndex) => {
    row.forEach((cell, column) => {
      if (!cell) return;
      minRow = Math.min(minRow, rowIndex);
      maxRow = Math.max(maxRow, rowIndex);
      minColumn = Math.min(minColumn, column);
      maxColumn = Math.max(maxColumn, column);
    });
  });

  if (maxRow < 0) return true;
  return maxRow - minRow + 1 <= 2 && maxColumn - minColumn + 1 <= 2;
}

export function shouldSkipRecipe(type: string, json: RawRecord): boolean {
  const normalized = stripId(type);
  if (normalized.startsWith("crafting_special")) return true;
  if (
    [
      "smithing_transform",
      "smithing_trim",
      "stonecutting",
      "crafting_decorated_pot",
      "crafting_dye",
      "crafting_imbue",
    ].includes(normalized)
  ) {
    return true;
  }

  const result = json.result;
  if (result && typeof result === "object") {
    const record = result as RawRecord;
    const id = typeof record.id === "string" ? stripId(record.id) : "";
    if (id.endsWith("_banner") && record.components) return true;
    if (id === "firework_star" || id.endsWith("_spawn_egg")) return true;
  }

  return false;
}

const METHOD_BY_TYPE: Record<string, keyof typeof COOKING_METHODS> = {
  smelting: "smelting",
  blasting: "blasting",
  smoking: "smoking",
  campfire_cooking: "campfire_cooking",
};

export function normalizeRecipe(
  id: string,
  json: RawRecord,
  context: NormalizeContext,
): Recipe | null {
  const type = typeof json.type === "string" ? stripId(json.type) : "";
  if (!type || shouldSkipRecipe(type, json)) return null;
  if (type === "crafting_shaped") return normalizeShaped(id, json, context);
  if (type === "crafting_shapeless") return normalizeShapeless(id, json, context);
  if (type === "crafting_transmute") return normalizeTransmute(id, json, context);
  if (type === "brewing") return normalizeBrewing(id, json);
  const cooking = METHOD_BY_TYPE[type];
  if (cooking) return normalizeCooking(id, json, cooking, context);
  return null;
}
