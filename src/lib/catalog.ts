import { categorize } from "@/data/categories";
import { howToGet } from "@/data/how-to-get";
import type { CatalogItem, CategoryId, Ingredient, Recipe } from "@/lib/types";

export function filterCatalog(
  items: CatalogItem[],
  query: string,
  category: CategoryId | "all",
): CatalogItem[] {
  const needle = query.trim().toLowerCase();
  return items.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    if (!needle) return true;
    return `${item.name} ${item.id.replaceAll("_", " ")}`.toLowerCase().includes(needle);
  });
}

export function ingredientMatches(ingredient: Ingredient, itemId: string): boolean {
  if (ingredient.itemId === itemId) return true;
  return ingredient.anyOf?.includes(itemId) ?? false;
}

export function recipeIngredients(recipe: Recipe): Ingredient[] {
  const ingredients: Ingredient[] = [];
  recipe.grid?.forEach((row) => {
    row.forEach((cell) => {
      if (cell) ingredients.push(cell);
    });
  });
  if (recipe.furnace) ingredients.push(recipe.furnace.input);
  if (recipe.brewing) ingredients.push(recipe.brewing.base, recipe.brewing.ingredient);
  return ingredients;
}

export function usedIn(itemId: string, recipes: Recipe[]): string[] {
  const results = new Set<string>();
  for (const recipe of recipes) {
    if (recipeIngredients(recipe).some((ingredient) => ingredientMatches(ingredient, itemId))) {
      results.add(recipe.result.itemId);
    }
  }
  results.delete(itemId);
  return [...results];
}

export function buildCatalog(
  items: { id: string; name: string }[],
  recipes: Recipe[],
): CatalogItem[] {
  const names = new Map(items.map((item) => [item.id, item.name]));
  const ids = new Set<string>(items.map((item) => item.id));

  for (const recipe of recipes) {
    ids.add(recipe.result.itemId);
    for (const ingredient of recipeIngredients(recipe)) {
      ids.add(ingredient.itemId);
      ingredient.anyOf?.forEach((id) => ids.add(id));
    }
  }

  return [...ids]
    .filter(
      (id) =>
        id !== "potion" &&
        id !== "splash_potion" &&
        id !== "lingering_potion" &&
        !id.endsWith("_spawn_egg"),
    )
    .map((id) => ({
      id,
      name: names.get(id) ?? titleCase(id),
      category: categorize(id),
      image: `/items/${id}.png`,
      howToGet: howToGet(id),
    }))
    .sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
}

function titleCase(id: string): string {
  return id
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
