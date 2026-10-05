import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import { potionColor, potionName } from "../src/data/brewing";
import { NETHERITE_GEAR } from "../src/data/how-to-get";
import { TAG_DISPLAY } from "../src/data/tag-display";
import { isPotionCatalogId, mergeCooking, normalizeRecipe, stripId } from "../src/lib/normalize";
import type { GameItem, Ingredient, NormalizeContext, Recipe } from "../src/lib/types";

type JsonRecord = Record<string, unknown>;

const GAME_VERSION = "26.3";
const ROOT = process.cwd();
const CACHE = path.join(ROOT, ".cache");
const DATA_DIR = path.join(CACHE, "mcmeta-data");
const ASSETS_DIR = path.join(CACHE, "mcmeta-assets");
const ASSET_ROOT = path.join(ASSETS_DIR, "assets", "minecraft");
const OUT_DATA = path.join(ROOT, "src", "data", "generated");
const OUT_ITEMS = path.join(ROOT, "public", "items");

const TEXTURE_SCORE: Record<string, number> = {
  layer0: 0,
  front: 1,
  side: 2,
  all: 3,
  north: 4,
  up: 5,
  top: 6,
  end: 7,
  particle: 8,
  down: 9,
  bottom: 10,
  layer1: 30,
};

function ensureClone(dir: string, tag: string, sparsePaths: string[]) {
  const versionFile = path.join(dir, "version.json");
  if (!fs.existsSync(path.join(dir, ".git"))) {
    fs.mkdirSync(CACHE, { recursive: true });
    execFileSync(
      "git",
      [
        "clone",
        "--depth",
        "1",
        "--branch",
        tag,
        "--filter=blob:none",
        "--sparse",
        "https://github.com/misode/mcmeta.git",
        dir,
      ],
      { stdio: "inherit" },
    );
  }
  execFileSync("git", ["-C", dir, "sparse-checkout", "set", "--skip-checks", ...sparsePaths], {
    stdio: "inherit",
  });
  if (fs.existsSync(versionFile)) {
    const version = JSON.parse(fs.readFileSync(versionFile, "utf8")) as { id?: string };
    if (version.id && version.id !== GAME_VERSION) {
      throw new Error(`Expected Minecraft ${GAME_VERSION} in ${dir}, found ${version.id}`);
    }
  }
}

function readJson(file: string): JsonRecord {
  return JSON.parse(fs.readFileSync(file, "utf8")) as JsonRecord;
}

function loadTags(dir: string): Map<string, string[]> {
  const raw = new Map<string, string[]>();
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".json")) continue;
    const json = readJson(path.join(dir, file));
    const values = (Array.isArray(json.values) ? json.values : []).flatMap((value) => {
      if (typeof value === "string") return [value];
      if (value && typeof value === "object" && typeof (value as JsonRecord).id === "string") {
        return [(value as JsonRecord).id as string];
      }
      return [];
    });
    raw.set(file.replace(/\.json$/, ""), values);
  }

  const expanded = new Map<string, string[]>();
  const expand = (tag: string, seen: Set<string>): string[] => {
    const cached = expanded.get(tag);
    if (cached) return cached;
    if (seen.has(tag)) return [];
    const nextSeen = new Set(seen);
    nextSeen.add(tag);
    const items: string[] = [];
    for (const value of raw.get(tag) ?? []) {
      if (value.startsWith("#")) items.push(...expand(stripId(value), nextSeen));
      else items.push(stripId(value));
    }
    const unique = [...new Set(items)];
    expanded.set(tag, unique);
    return unique;
  };

  for (const tag of raw.keys()) expand(tag, new Set());
  return expanded;
}

function walkJsonFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkJsonFiles(full));
    else if (entry.name.endsWith(".json")) files.push(full);
  }
  return files;
}

type TextureHit = { key: string; value: string; depth: number };

function walkNode(
  node: unknown,
  keyName: string | undefined,
  textures: TextureHit[],
  parents: string[],
  depth: number,
  inTextures = false,
) {
  if (typeof node === "string") {
    if (
      (keyName === "parent" || keyName === "model" || keyName === "base") &&
      !node.startsWith("#")
    ) {
      parents.push(node);
      return;
    }
    if (
      inTextures &&
      !node.startsWith("#") &&
      (node.includes("/") || node.startsWith("minecraft:"))
    ) {
      textures.push({ key: keyName ?? "texture", value: node, depth });
    }
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((child) => walkNode(child, undefined, textures, parents, depth, inTextures));
    return;
  }
  if (!node || typeof node !== "object") return;
  for (const [key, value] of Object.entries(node as JsonRecord)) {
    walkNode(value, key, textures, parents, depth, inTextures || key === "textures");
  }
}

function modelFile(modelId: string): string | null {
  const normalized = modelId.replace(/^minecraft:/, "");
  const file = path.join(ASSET_ROOT, "models", `${normalized}.json`);
  return fs.existsSync(file) ? file : null;
}

function textureFile(textureId: string): string | null {
  const normalized = textureId.replace(/^minecraft:/, "").replace(/\.png$/, "");
  const file = path.join(ASSET_ROOT, "textures", `${normalized}.png`);
  return fs.existsSync(file) ? file : null;
}

function resolveTexture(itemId: string): string | null {
  const textures: TextureHit[] = [];
  const seen = new Set<string>();
  const visit = (file: string, depth: number) => {
    if (!fs.existsSync(file) || depth > 6) return;
    const parents: string[] = [];
    walkNode(readJson(file), undefined, textures, parents, depth);
    for (const parent of parents) {
      const normalized = parent.replace(/^minecraft:/, "");
      if (seen.has(normalized)) continue;
      seen.add(normalized);
      const next = modelFile(parent);
      if (next) visit(next, depth + 1);
    }
  };

  const definition = path.join(ASSET_ROOT, "items", `${itemId}.json`);
  if (fs.existsSync(definition)) visit(definition, 0);

  textures.sort(
    (a, b) => a.depth - b.depth || (TEXTURE_SCORE[a.key] ?? 4) - (TEXTURE_SCORE[b.key] ?? 4),
  );
  for (const texture of textures) {
    const file = textureFile(texture.value);
    if (file) return file;
  }

  for (const candidate of [
    path.join(ASSET_ROOT, "textures", "item", `${itemId}.png`),
    path.join(ASSET_ROOT, "textures", "block", `${itemId}.png`),
  ]) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function firstFrame(source: Buffer): Buffer {
  const png = PNG.sync.read(source);
  if (png.height <= png.width) return source;
  const frame = new PNG({ width: png.width, height: png.width });
  for (let y = 0; y < png.width; y += 1) {
    for (let x = 0; x < png.width; x += 1) {
      const sourceIndex = (y * png.width + x) * 4;
      const targetIndex = (y * frame.width + x) * 4;
      frame.data[targetIndex] = png.data[sourceIndex]!;
      frame.data[targetIndex + 1] = png.data[sourceIndex + 1]!;
      frame.data[targetIndex + 2] = png.data[sourceIndex + 2]!;
      frame.data[targetIndex + 3] = png.data[sourceIndex + 3]!;
    }
  }
  return PNG.sync.write(frame);
}

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}

function compositePotion(bottleFile: string, overlayFile: string, color: string): Buffer {
  const bottle = PNG.sync.read(fs.readFileSync(bottleFile));
  const overlay = PNG.sync.read(firstFrame(fs.readFileSync(overlayFile)));
  const output = new PNG({ width: bottle.width, height: bottle.height });
  const [red, green, blue] = hexToRgb(color);
  const overlayHeight = Math.min(overlay.height, overlay.width);
  for (let y = 0; y < bottle.height; y += 1) {
    for (let x = 0; x < bottle.width; x += 1) {
      const index = (y * bottle.width + x) * 4;
      const overlayIndex =
        y < overlayHeight && x < overlay.width ? (y * overlay.width + x) * 4 : -1;
      const overlayAlpha = overlayIndex >= 0 ? overlay.data[overlayIndex + 3]! : 0;
      if (overlayAlpha > 16) {
        output.data[index] = red;
        output.data[index + 1] = green;
        output.data[index + 2] = blue;
        output.data[index + 3] = overlayAlpha;
      } else {
        output.data[index] = bottle.data[index]!;
        output.data[index + 1] = bottle.data[index + 1]!;
        output.data[index + 2] = bottle.data[index + 2]!;
        output.data[index + 3] = bottle.data[index + 3]!;
      }
    }
  }
  return PNG.sync.write(output);
}

function itemName(id: string, lang: Record<string, string>): string {
  return (
    lang[`item.minecraft.${id}`] ??
    lang[`block.minecraft.${id}`] ??
    id
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function wikiFileName(name: string): string {
  return `Invicon_${name.replaceAll(" ", "_")}.png`;
}

async function downloadWikiIcon(name: string): Promise<Buffer | null> {
  const url = `https://minecraft.wiki/images/${wikiFileName(name)}`;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(12000) });
    if (!response.ok) return null;
    const bytes = Buffer.from(await response.arrayBuffer());
    return bytes.byteLength > 32 ? bytes : null;
  } catch {
    return null;
  }
}

function wantsWikiIcon(id: string): boolean {
  return (
    id === "grass_block" ||
    id.endsWith("_bed") ||
    id === "chest" ||
    id === "trapped_chest" ||
    id === "ender_chest" ||
    id === "conduit" ||
    id === "bell" ||
    id === "decorated_pot"
  );
}

function referencedIds(recipes: Recipe[]): Set<string> {
  const ids = new Set<string>(["coal", "blaze_powder", ...NETHERITE_GEAR]);
  const add = (ingredient: Ingredient | null | undefined) => {
    if (!ingredient) return;
    ids.add(ingredient.itemId);
    ingredient.anyOf?.forEach((id) => ids.add(id));
  };
  for (const recipe of recipes) {
    ids.add(recipe.result.itemId);
    recipe.grid?.forEach((row) => row.forEach(add));
    add(recipe.furnace?.input);
    add(recipe.brewing?.base);
    add(recipe.brewing?.ingredient);
  }
  return ids;
}

async function mapPool<T>(items: T[], limit: number, worker: (item: T) => Promise<void>) {
  let index = 0;
  async function run() {
    while (index < items.length) {
      const current = items[index];
      index += 1;
      if (current !== undefined) await worker(current);
    }
  }
  await Promise.all(Array.from({ length: limit }, () => run()));
}

function writeAppleIcon() {
  const size = 180;
  const png = new PNG({ width: size, height: size });
  const radius = 36;
  const background = [17, 24, 39, 255];
  const cell = [55, 65, 81, 255];
  const blue = [59, 130, 246, 255];
  const emerald = [52, 211, 153, 255];

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const inside = rounded(x, y, size, radius);
      const color = inside ? background : [0, 0, 0, 0];
      png.data[index] = color[0]!;
      png.data[index + 1] = color[1]!;
      png.data[index + 2] = color[2]!;
      png.data[index + 3] = color[3]!;
    }
  }

  const origin = 28;
  const cellSize = 34;
  const gap = 11;
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      const color = row === 1 && column === 1 ? blue : row === 2 && column === 1 ? emerald : cell;
      fillRect(
        png,
        origin + column * (cellSize + gap),
        origin + row * (cellSize + gap),
        cellSize,
        cellSize,
        color,
      );
    }
  }

  fs.writeFileSync(path.join(ROOT, "src", "app", "apple-icon.png"), PNG.sync.write(png));
}

function rounded(x: number, y: number, size: number, radius: number): boolean {
  const inset = radius;
  if (x >= inset && x < size - inset) return true;
  if (y >= inset && y < size - inset) return true;
  const corners = [
    [inset, inset],
    [size - inset - 1, inset],
    [inset, size - inset - 1],
    [size - inset - 1, size - inset - 1],
  ];
  return corners.some(([cx, cy]) => (x - cx!) ** 2 + (y - cy!) ** 2 <= radius * radius);
}

function fillRect(png: PNG, x: number, y: number, width: number, height: number, color: number[]) {
  for (let row = y; row < y + height; row += 1) {
    for (let column = x; column < x + width; column += 1) {
      const index = (row * png.width + column) * 4;
      if ((png.data[index + 3] ?? 0) === 0) continue;
      png.data[index] = color[0]!;
      png.data[index + 1] = color[1]!;
      png.data[index + 2] = color[2]!;
      png.data[index + 3] = color[3]!;
    }
  }
}

async function main() {
  console.log(`Syncing Minecraft Java Edition ${GAME_VERSION}`);
  ensureClone(DATA_DIR, `${GAME_VERSION}-data-json`, [
    "data/minecraft/recipe",
    "data/minecraft/tags/item",
  ]);
  ensureClone(ASSETS_DIR, `${GAME_VERSION}-assets`, [
    "assets/minecraft/textures/item",
    "assets/minecraft/textures/block",
    "assets/minecraft/items",
    "assets/minecraft/models/item",
    "assets/minecraft/models/block",
    "assets/minecraft/lang/en_us.json",
  ]);

  const lang = JSON.parse(
    fs.readFileSync(path.join(ASSET_ROOT, "lang", "en_us.json"), "utf8"),
  ) as Record<string, string>;
  const tags = loadTags(path.join(DATA_DIR, "data", "minecraft", "tags", "item"));
  const context: NormalizeContext = { tags, display: TAG_DISPLAY };
  const recipeDir = path.join(DATA_DIR, "data", "minecraft", "recipe");
  const parsed: Recipe[] = [];

  for (const file of walkJsonFiles(recipeDir)) {
    const json = readJson(file);
    const id = path.basename(file, ".json");
    const recipe = normalizeRecipe(id, json, context);
    if (recipe) parsed.push(recipe);
  }

  const recipes = mergeCooking(parsed).sort(
    (a, b) => a.result.itemId.localeCompare(b.result.itemId) || a.id.localeCompare(b.id),
  );

  const ids = referencedIds(recipes);
  const items: GameItem[] = [];
  for (const id of [...ids].sort()) {
    if (id.endsWith("_spawn_egg") || id === "air") continue;
    if (isPotionCatalogId(id)) {
      const container = id.startsWith("lingering_potion_")
        ? "lingering_potion"
        : id.startsWith("splash_potion_")
          ? "splash_potion"
          : "potion";
      const type = id.slice(container.length + 1);
      items.push({ id, name: potionName(container, type, lang) });
      continue;
    }
    const hasAsset =
      fs.existsSync(path.join(ASSET_ROOT, "items", `${id}.json`)) ||
      Boolean(lang[`item.minecraft.${id}`] || lang[`block.minecraft.${id}`]);
    if (!hasAsset) continue;
    items.push({ id, name: itemName(id, lang) });
  }

  fs.mkdirSync(OUT_DATA, { recursive: true });
  fs.mkdirSync(OUT_ITEMS, { recursive: true });
  fs.writeFileSync(path.join(OUT_DATA, "recipes.json"), JSON.stringify(recipes));
  fs.writeFileSync(path.join(OUT_DATA, "items.json"), JSON.stringify(items));
  fs.writeFileSync(
    path.join(OUT_DATA, "meta.json"),
    JSON.stringify({ id: GAME_VERSION, name: GAME_VERSION, syncedAt: new Date().toISOString() }),
  );

  const vanilla = items.filter((item) => !isPotionCatalogId(item.id));
  const missing: string[] = [];
  for (const item of vanilla) {
    const texture = resolveTexture(item.id);
    if (!texture) {
      missing.push(item.id);
      continue;
    }
    fs.writeFileSync(path.join(OUT_ITEMS, `${item.id}.png`), firstFrame(fs.readFileSync(texture)));
  }

  const overlay = path.join(ASSET_ROOT, "textures", "item", "potion_overlay.png");
  const bottles: Record<string, string> = {
    potion: path.join(ASSET_ROOT, "textures", "item", "potion.png"),
    splash_potion: path.join(ASSET_ROOT, "textures", "item", "splash_potion.png"),
    lingering_potion: path.join(ASSET_ROOT, "textures", "item", "lingering_potion.png"),
  };
  for (const item of items.filter((entry) => isPotionCatalogId(entry.id))) {
    const container = item.id.startsWith("lingering_potion_")
      ? "lingering_potion"
      : item.id.startsWith("splash_potion_")
        ? "splash_potion"
        : "potion";
    const type = item.id.slice(container.length + 1);
    const bottle = bottles[container];
    if (!bottle || !fs.existsSync(bottle) || !fs.existsSync(overlay)) {
      missing.push(item.id);
      continue;
    }
    fs.writeFileSync(
      path.join(OUT_ITEMS, `${item.id}.png`),
      compositePotion(bottle, overlay, potionColor(type)),
    );
  }

  const wikiTargets = items.filter((item) => wantsWikiIcon(item.id));
  let wikiHits = 0;
  await mapPool(wikiTargets, 6, async (item) => {
    const bytes = await downloadWikiIcon(item.name);
    if (!bytes) return;
    fs.writeFileSync(path.join(OUT_ITEMS, `${item.id}.png`), bytes);
    wikiHits += 1;
  });

  fs.writeFileSync(
    path.join(OUT_ITEMS, "missing.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" fill="#e5e7eb"/><path d="M3 3h10v10H3z" fill="none" stroke="#9ca3af"/></svg>`,
  );

  writeAppleIcon();

  console.log(`Recipes: ${recipes.length}`);
  console.log(`Items: ${items.length}`);
  console.log(`Wiki icons: ${wikiHits}/${wikiTargets.length}`);
  console.log(`Missing textures: ${missing.length}`);
  if (missing.length > 0) console.log(missing.join(", "));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
