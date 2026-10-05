import type { CategoryId } from "@/lib/types";
import { isPotionCatalogId } from "@/lib/normalize";

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "basic", label: "Basic" },
  { id: "tools", label: "Tools & utilities" },
  { id: "combat", label: "Combat" },
  { id: "food", label: "Food" },
  { id: "building", label: "Building blocks" },
  { id: "redstone", label: "Redstone & mechanisms" },
  { id: "functional", label: "Functional blocks" },
  { id: "enchanting", label: "Enchanting & brewing" },
  { id: "potions", label: "Potions" },
  { id: "materials", label: "Materials" },
];

const BASIC = new Set([
  "oak_planks",
  "stick",
  "torch",
  "crafting_table",
  "chest",
  "furnace",
  "ladder",
  "oak_fence",
  "oak_fence_gate",
  "oak_boat",
  "oak_chest_boat",
  "oak_slab",
  "stone_slab",
  "oak_sign",
  "oak_door",
  "red_bed",
  "glass",
]);

const FOOD = new Set([
  "bread",
  "cookie",
  "cake",
  "pumpkin_pie",
  "golden_apple",
  "enchanted_golden_apple",
  "honey_bottle",
  "golden_carrot",
  "glistering_melon_slice",
  "beetroot_soup",
  "mushroom_stew",
  "rabbit_stew",
  "suspicious_stew",
  "dried_kelp",
  "sweet_berries",
  "glow_berries",
  "melon_slice",
  "apple",
  "carrot",
  "potato",
  "baked_potato",
  "poisonous_potato",
  "beetroot",
  "chorus_fruit",
  "beef",
  "porkchop",
  "mutton",
  "chicken",
  "rabbit",
  "cod",
  "salmon",
  "tropical_fish",
  "pufferfish",
]);

const TOOLS = new Set([
  "bucket",
  "fishing_rod",
  "flint_and_steel",
  "carrot_on_a_stick",
  "warped_fungus_on_a_stick",
  "shears",
  "lead",
  "compass",
  "recovery_compass",
  "clock",
  "spyglass",
  "writable_book",
  "written_book",
  "firework_rocket",
  "brush",
  "name_tag",
  "bundle",
  "goat_horn",
]);

const COMBAT = new Set([
  "mace",
  "shield",
  "bow",
  "crossbow",
  "arrow",
  "spectral_arrow",
  "tipped_arrow",
  "tnt",
  "wind_charge",
  "wolf_armor",
]);

const ENCHANTING = new Set([
  "enchanting_table",
  "bookshelf",
  "book",
  "glass_bottle",
  "cauldron",
  "brewing_stand",
  "blaze_powder",
  "blaze_rod",
  "fermented_spider_eye",
  "magma_cream",
  "nether_wart",
  "ghast_tear",
  "phantom_membrane",
  "rabbit_foot",
  "dragon_breath",
  "spider_eye",
]);

const REDSTONE = new Set([
  "redstone",
  "repeater",
  "comparator",
  "lever",
  "observer",
  "piston",
  "sticky_piston",
  "dispenser",
  "dropper",
  "crafter",
  "hopper",
  "note_block",
  "daylight_detector",
  "tripwire_hook",
  "sculk_sensor",
  "calibrated_sculk_sensor",
  "target",
  "copper_bulb",
  "trapped_chest",
]);

const FUNCTIONAL = new Set([
  "barrel",
  "ender_chest",
  "shulker_box",
  "lectern",
  "composter",
  "beehive",
  "bee_nest",
  "loom",
  "grindstone",
  "stonecutter",
  "smithing_table",
  "blast_furnace",
  "smoker",
  "cartography_table",
  "fletching_table",
  "flower_pot",
  "item_frame",
  "glow_item_frame",
  "painting",
  "armor_stand",
  "beacon",
  "conduit",
  "lodestone",
  "scaffolding",
  "respawn_anchor",
  "ender_eye",
  "ender_pearl",
  "jukebox",
  "anvil",
  "chipped_anvil",
  "damaged_anvil",
  "chiseled_bookshelf",
  "decorated_pot",
  "campfire",
  "soul_campfire",
  "lantern",
  "soul_lantern",
  "bell",
  "crafter",
  "dried_ghast",
  "creaking_heart",
]);

const COMBAT_SUFFIXES = [
  "_sword",
  "_spear",
  "_helmet",
  "_chestplate",
  "_leggings",
  "_boots",
  "_horse_armor",
];
const TOOL_SUFFIXES = ["_pickaxe", "_axe", "_shovel", "_hoe", "_bucket", "_harness"];

export function categorize(id: string): CategoryId {
  if (isPotionCatalogId(id)) return "potions";
  if (BASIC.has(id)) return "basic";
  if (
    FOOD.has(id) ||
    id.startsWith("cooked_") ||
    id.startsWith("baked_") ||
    id.startsWith("dried_")
  )
    return "food";
  if (id.endsWith("_stew") || id.endsWith("_soup") || id.endsWith("_pie")) return "food";
  if (COMBAT.has(id) || COMBAT_SUFFIXES.some((suffix) => id.endsWith(suffix))) return "combat";
  if (TOOLS.has(id) || TOOL_SUFFIXES.some((suffix) => id.endsWith(suffix))) return "tools";
  if (ENCHANTING.has(id)) return "enchanting";
  if (id.includes("redstone") && !id.endsWith("_ore")) return "redstone";
  if (
    REDSTONE.has(id) ||
    id.endsWith("_button") ||
    id.endsWith("_pressure_plate") ||
    id.endsWith("_rail") ||
    id.includes("minecart")
  ) {
    return "redstone";
  }
  if (
    FUNCTIONAL.has(id) ||
    id.endsWith("_bed") ||
    id.endsWith("_banner") ||
    id.endsWith("_door") ||
    id.endsWith("_trapdoor") ||
    id.endsWith("_sign") ||
    id.endsWith("_hanging_sign") ||
    id.endsWith("_shulker_box") ||
    id.endsWith("_boat") ||
    id.endsWith("_shelf") ||
    (id.endsWith("_torch") && id !== "torch")
  ) {
    return "functional";
  }
  if (
    id.endsWith("_ingot") ||
    id.endsWith("_nugget") ||
    id.endsWith("_dye") ||
    id.endsWith("_scrap") ||
    id.startsWith("raw_") ||
    id.endsWith("_ore") ||
    id === "leather" ||
    id === "string" ||
    id === "flint" ||
    id === "feather" ||
    id === "gunpowder" ||
    id === "paper" ||
    id === "sugar" ||
    id === "bowl" ||
    id === "brick" ||
    id === "nether_brick" ||
    id === "clay_ball" ||
    id === "wheat" ||
    id === "egg" ||
    id === "bone" ||
    id === "slime_ball" ||
    id === "honeycomb"
  ) {
    return "materials";
  }
  return "building";
}
