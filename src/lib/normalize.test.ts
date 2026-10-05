import { describe, expect, it } from "vitest";
import { categorize } from "@/data/categories";
import { filterCatalog } from "@/lib/catalog";
import {
  fitsInInventory,
  mergeCooking,
  normalizeBrewing,
  normalizeCooking,
  normalizeShaped,
  normalizeShapeless,
} from "@/lib/normalize";
import type { CatalogItem, NormalizeContext } from "@/lib/types";

const context: NormalizeContext = {
  tags: new Map([
    ["planks", ["oak_planks", "spruce_planks"]],
    ["mushrooms", ["red_mushroom", "brown_mushroom"]],
    ["diamond_tool_materials", ["diamond"]],
  ]),
  display: {
    planks: "oak_planks",
    mushrooms: "red_mushroom",
    diamond_tool_materials: "diamond",
  },
};

describe("recipe normalizer", () => {
  it("normalizes a shaped diamond pickaxe", () => {
    const recipe = normalizeShaped(
      "diamond_pickaxe",
      {
        type: "minecraft:crafting_shaped",
        key: { "#": "minecraft:stick", X: "#minecraft:diamond_tool_materials" },
        pattern: ["XXX", " # ", " # "],
        result: { id: "minecraft:diamond_pickaxe" },
      },
      context,
    );

    expect(recipe?.result).toEqual({ itemId: "diamond_pickaxe", count: 1 });
    expect(recipe?.grid?.[0]?.map((cell) => cell?.itemId)).toEqual([
      "diamond",
      "diamond",
      "diamond",
    ]);
    expect(recipe?.grid?.[1]?.[1]?.itemId).toBe("stick");
    expect(recipe?.grid && fitsInInventory(recipe.grid)).toBe(false);
  });

  it("normalizes a shapeless mushroom stew", () => {
    const recipe = normalizeShapeless(
      "mushroom_stew",
      {
        type: "minecraft:crafting_shapeless",
        ingredients: ["#minecraft:mushrooms", "#minecraft:mushrooms", "minecraft:bowl"],
        result: { id: "minecraft:mushroom_stew" },
      },
      context,
    );

    expect(recipe?.shapeless).toBe(true);
    expect(recipe?.grid?.[0]?.map((cell) => cell?.itemId)).toEqual([
      "red_mushroom",
      "red_mushroom",
      "bowl",
    ]);
    expect(recipe?.grid?.[0]?.[0]?.anyOf).toEqual(["red_mushroom", "brown_mushroom"]);
  });

  it("keeps a tag ingredient and fits a 2x2 recipe in the inventory", () => {
    const recipe = normalizeShaped(
      "stick",
      {
        key: { "#": "#minecraft:planks" },
        pattern: ["#", "#"],
        result: { id: "minecraft:stick", count: 4 },
      },
      context,
    );

    expect(recipe?.grid?.[0]?.[0]).toMatchObject({ itemId: "oak_planks" });
    expect(recipe?.grid?.[0]?.[0]?.anyOf).toContain("spruce_planks");
    expect(recipe?.result.count).toBe(4);
    expect(recipe?.grid && fitsInInventory(recipe.grid)).toBe(true);
  });

  it("merges furnace and blast-furnace iron ingot recipes", () => {
    const smelting = normalizeCooking(
      "iron_ingot_from_smelting_raw_iron",
      { ingredient: "minecraft:raw_iron", result: { id: "minecraft:iron_ingot" } },
      "smelting",
      context,
    );
    const blasting = normalizeCooking(
      "iron_ingot_from_blasting_raw_iron",
      { ingredient: "minecraft:raw_iron", result: { id: "minecraft:iron_ingot" } },
      "blasting",
      context,
    );
    const [merged] = mergeCooking([smelting!, blasting!]);
    expect(merged?.furnace?.input.itemId).toBe("raw_iron");
    expect(merged?.furnace?.methods).toEqual(["furnace", "blast_furnace"]);
  });

  it("normalizes an awkward potion", () => {
    const recipe = normalizeBrewing("potion_water_nether_wart", {
      type: "minecraft:brewing",
      input: { item: "minecraft:potion", potion_contents: { potions: "minecraft:water" } },
      reagent: { item: "minecraft:nether_wart" },
      output: {
        id: "minecraft:potion",
        components: { "minecraft:potion_contents": { potion: "minecraft:awkward" } },
      },
    });

    expect(recipe?.station).toBe("brewing_stand");
    expect(recipe?.brewing).toEqual({
      base: { itemId: "potion_water" },
      ingredient: { itemId: "nether_wart" },
    });
    expect(recipe?.result.itemId).toBe("potion_awkward");
  });
});

describe("catalog filter", () => {
  const items: CatalogItem[] = [
    { id: "stick", name: "Stick", category: "basic", image: "/items/stick.png" },
    { id: "oak_planks", name: "Oak Planks", category: "basic", image: "/items/oak_planks.png" },
    { id: "iron_ingot", name: "Iron Ingot", category: "materials", image: "/items/iron_ingot.png" },
  ];

  it("filters by category and search text", () => {
    expect(filterCatalog(items, "oak", "all").map((item) => item.id)).toEqual(["oak_planks"]);
    expect(filterCatalog(items, "", "materials").map((item) => item.id)).toEqual(["iron_ingot"]);
    expect(filterCatalog(items, "planks", "basic")).toHaveLength(1);
  });

  it("places representative items in the reference categories", () => {
    expect(categorize("oak_planks")).toBe("basic");
    expect(categorize("diamond_pickaxe")).toBe("tools");
    expect(categorize("diamond_sword")).toBe("combat");
    expect(categorize("bread")).toBe("food");
    expect(categorize("stone_bricks")).toBe("building");
    expect(categorize("piston")).toBe("redstone");
    expect(categorize("barrel")).toBe("functional");
    expect(categorize("brewing_stand")).toBe("enchanting");
    expect(categorize("potion_healing")).toBe("potions");
    expect(categorize("iron_ingot")).toBe("materials");
  });
});
