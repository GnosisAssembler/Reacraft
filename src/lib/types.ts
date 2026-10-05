export type Station = "crafting_table" | "furnace" | "brewing_stand";

export type FurnaceMethod = "furnace" | "blast_furnace" | "smoker" | "campfire";

export type Ingredient = {
  itemId: string;
  anyOf?: string[];
};

export type Recipe = {
  id: string;
  station: Station;
  result: { itemId: string; count: number };
  grid?: (Ingredient | null)[][];
  shapeless?: boolean;
  furnace?: { input: Ingredient; methods: FurnaceMethod[] };
  brewing?: { base: Ingredient; ingredient: Ingredient };
};

export type GameItem = {
  id: string;
  name: string;
};

export type CategoryId =
  | "basic"
  | "tools"
  | "combat"
  | "food"
  | "building"
  | "redstone"
  | "functional"
  | "enchanting"
  | "potions"
  | "materials";

export type CatalogItem = {
  id: string;
  name: string;
  category: CategoryId;
  image: string;
  howToGet?: string;
};

export type GameMeta = {
  id: string;
  name: string;
  syncedAt: string;
};

export type NormalizeContext = {
  tags: Map<string, string[]>;
  display: Record<string, string>;
};
