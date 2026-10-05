"use client";

import { useState } from "react";
import { Badge } from "@/components/atoms/Badge/Badge";
import { ItemIcon } from "@/components/atoms/ItemIcon/ItemIcon";
import { Text } from "@/components/atoms/Text/Text";
import { BrewingStand } from "@/components/molecules/BrewingStand/BrewingStand";
import type { SlotData } from "@/components/molecules/CraftingGrid/CraftingGrid";
import { CraftingGrid } from "@/components/molecules/CraftingGrid/CraftingGrid";
import { FurnaceGrid } from "@/components/molecules/FurnaceGrid/FurnaceGrid";
import { ItemButton } from "@/components/molecules/ItemButton/ItemButton";
import { RecipeSelect } from "@/components/molecules/RecipeSelect/RecipeSelect";
import { howToGet } from "@/data/how-to-get";
import { recipeIngredients } from "@/lib/catalog";
import { fitsInInventory } from "@/lib/normalize";
import { recipeOptionLabel, stationLabel } from "@/lib/format";
import { catalogById, namesById, recipesFor, usedInItems } from "@/lib/game-data";
import type { Ingredient, Recipe } from "@/lib/types";

type RecipePanelProps = {
  itemId: string | null;
  onSelect: (itemId: string) => void;
};

export function RecipePanel({ itemId, onSelect }: RecipePanelProps) {
  const item = itemId ? catalogById.get(itemId) : undefined;
  const options = item ? recipesFor(item.id).slice().sort(compareRecipes) : [];
  const [pickedId, setPickedId] = useState<string | null>(null);
  const recipe = options.find((option) => option.id === pickedId) ?? options[0];
  const related = item ? usedInItems(item.id).slice(0, 18) : [];
  const notes = item ? howToGetNotes(item.id, item.howToGet, recipe) : [];

  return (
    <section
      id="recipe-panel"
      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <Text as="h2" size="xs" tone="muted" className="font-medium tracking-wide uppercase">
        Recipe
      </Text>

      {!itemId || !item ? (
        <Text className="mt-6 mb-4">
          {itemId ? "That item is not in this guide." : "Select an item to see how it is crafted."}
        </Text>
      ) : (
        <div className="mt-3 space-y-4">
          <div className="flex items-center gap-3">
            <ItemIcon src={item.image} size={48} alt="" />
            <div>
              <Text as="h3" size="lg" tone="strong" className="font-semibold">
                {item.name}
              </Text>
              <div className="mt-1 flex flex-wrap gap-1">
                {recipe ? (
                  <Badge tone="blue">{stationLabel(recipe)}</Badge>
                ) : (
                  <Badge>Not crafted here</Badge>
                )}
                {recipe?.shapeless ? <Badge>Shapeless</Badge> : null}
                {recipe?.grid &&
                recipe.station === "crafting_table" &&
                fitsInInventory(recipe.grid) ? (
                  <Badge tone="amber">Inventory or crafting table</Badge>
                ) : null}
              </div>
            </div>
          </div>

          {options.length > 1 && recipe ? (
            <RecipeSelect
              value={recipe.id}
              options={options.map((option) => ({
                value: option.id,
                label: recipeOptionLabel(option, namesById),
              }))}
              onChange={setPickedId}
            />
          ) : null}

          {recipe?.station === "crafting_table" && recipe.grid ? (
            <CraftingGrid
              grid={recipe.grid.map((row) => row.map((cell) => toSlot(cell)))}
              result={resultSlot(recipe)}
              onSelect={onSelect}
            />
          ) : null}

          {recipe?.station === "furnace" && recipe.furnace ? (
            <FurnaceGrid
              input={toSlot(recipe.furnace.input)}
              fuel={toSlot({ itemId: "coal" }, "Any fuel")}
              result={resultSlot(recipe)}
              onSelect={onSelect}
            />
          ) : null}

          {recipe?.station === "brewing_stand" && recipe.brewing ? (
            <BrewingStand
              ingredient={toSlot(recipe.brewing.ingredient)}
              fuel={toSlot({ itemId: "blaze_powder" }, "Blaze powder (fuel)")}
              base={toSlot(recipe.brewing.base)}
              result={resultSlot(recipe)}
              onSelect={onSelect}
            />
          ) : null}

          {notes.length > 0 ? (
            <div>
              <Text size="xs" tone="muted" className="font-medium tracking-wide uppercase">
                How to get
              </Text>
              <ul className="mt-1 space-y-1">
                {notes.map((note) => (
                  <li key={note}>
                    <Text>{note}</Text>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {related.length > 0 ? (
            <div>
              <Text size="xs" tone="muted" className="font-medium tracking-wide uppercase">
                Used in
              </Text>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {related.map((relatedItem) => (
                  <ItemButton key={relatedItem.id} item={relatedItem} compact onSelect={onSelect} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}

function compareRecipes(a: Recipe, b: Recipe): number {
  const rank = (recipe: Recipe) => {
    const input = recipe.furnace?.input.itemId ?? "";
    if (input.startsWith("raw_")) return 0;
    if (input.endsWith("_ore")) return 2;
    if (recipe.station === "furnace") return 1;
    return 3;
  };
  return rank(a) - rank(b) || a.id.localeCompare(b.id);
}

function toSlot(ingredient: Ingredient | null, nameOverride?: string): SlotData {
  if (!ingredient) return { ingredient: null };
  const known = catalogById.get(ingredient.itemId);
  return {
    ingredient,
    name: nameOverride ?? known?.name ?? namesById.get(ingredient.itemId) ?? ingredient.itemId,
    image: known?.image ?? `/items/${ingredient.itemId}.png`,
    anyNames: ingredient.anyOf?.map((id) => namesById.get(id) ?? id),
  };
}

function resultSlot(recipe: Recipe): SlotData & { count: number } {
  const slot = toSlot({ itemId: recipe.result.itemId });
  return { ...slot, ingredient: { itemId: recipe.result.itemId }, count: recipe.result.count };
}

function howToGetNotes(
  itemId: string,
  own: string | undefined,
  recipe: Recipe | undefined,
): string[] {
  const notes: string[] = [];
  if (own) notes.push(own);
  if (!recipe) return notes;
  for (const ingredient of recipeIngredients(recipe)) {
    const text = howToGet(ingredient.itemId);
    if (!text || text === own) continue;
    const name = namesById.get(ingredient.itemId) ?? ingredient.itemId;
    const line = `${name}: ${text}`;
    if (!notes.includes(line)) notes.push(line);
    if (notes.length >= 3) break;
  }
  return notes;
}
