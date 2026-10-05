import itemRecords from "@/data/generated/items.json";
import metaRecord from "@/data/generated/meta.json";
import recipeRecords from "@/data/generated/recipes.json";
import { buildCatalog, usedIn } from "@/lib/catalog";
import type { CatalogItem, GameItem, GameMeta, Recipe } from "@/lib/types";

export const meta = metaRecord as GameMeta;
export const items = itemRecords as GameItem[];
export const recipes = recipeRecords as Recipe[];
export const catalog: CatalogItem[] = buildCatalog(items, recipes);
export const catalogById = new Map(catalog.map((item) => [item.id, item]));
export const namesById = new Map(catalog.map((item) => [item.id, item.name]));

const byResult = new Map<string, Recipe[]>();
for (const recipe of recipes) {
  const list = byResult.get(recipe.result.itemId) ?? [];
  list.push(recipe);
  byResult.set(recipe.result.itemId, list);
}

export function recipesFor(itemId: string): Recipe[] {
  return byResult.get(itemId) ?? [];
}

export function usedInItems(itemId: string): CatalogItem[] {
  return usedIn(itemId, recipes)
    .map((id) => catalogById.get(id))
    .filter((item): item is CatalogItem => Boolean(item));
}
