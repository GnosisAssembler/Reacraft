import type { FurnaceMethod, Recipe } from "@/lib/types";

const METHOD_LABEL: Record<FurnaceMethod, string> = {
  furnace: "Furnace",
  blast_furnace: "Blast furnace",
  smoker: "Smoker",
  campfire: "Campfire",
};

export function furnaceLabel(methods: FurnaceMethod[]): string {
  if (methods.includes("furnace")) {
    const also = methods.filter((method) => method !== "furnace");
    if (also.length === 0) return "Furnace";
    return `Furnace, also ${also.map((method) => METHOD_LABEL[method].toLowerCase()).join(" and ")}`;
  }
  return methods.map((method) => METHOD_LABEL[method]).join(", ");
}

export function stationLabel(recipe: Recipe): string {
  if (recipe.station === "furnace" && recipe.furnace) return furnaceLabel(recipe.furnace.methods);
  if (recipe.station === "brewing_stand") return "Brewing stand";
  return "Crafting table";
}

export function recipeOptionLabel(recipe: Recipe, names: Map<string, string>): string {
  const station = stationLabel(recipe);
  if (recipe.furnace) {
    const input = names.get(recipe.furnace.input.itemId) ?? titleCase(recipe.furnace.input.itemId);
    return `${station} from ${input}`;
  }
  if (recipe.brewing) {
    const ingredient =
      names.get(recipe.brewing.ingredient.itemId) ?? titleCase(recipe.brewing.ingredient.itemId);
    return `${station} with ${ingredient}`;
  }
  return recipe.shapeless ? `${station}, shapeless` : station;
}

function titleCase(id: string): string {
  return id
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
