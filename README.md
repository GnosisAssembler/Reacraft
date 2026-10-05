# Reacraft

A Minecraft crafting guide for Java Edition. Pick an item and the page shows how to make it on a crafting table, in a furnace, or on a brewing stand.

![Reacraft](public/brand/logo.svg)

Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.

The guide tracks Minecraft Java Edition **26.3**, the current stable release in the [mcmeta](https://github.com/misode/mcmeta) data set. That release includes the recipes people know from 1.21, plus later additions such as copper gear and the newer potions.

## What you can do

- Browse items by the same kinds of groups as [minecraft-craftings.com](https://minecraft-craftings.com/): basic, tools, combat, food, building, redstone, functional blocks, enchanting, potions, and materials.
- Select an item and see its recipe. The address updates to `/?item=...`, so a refresh or a shared link opens the same item.
- Click an ingredient to open that item.
- Switch recipes when an item has more than one, such as smelting raw iron or blasting it.
- Search, filter by category, and toggle a dark theme.

Shaped recipes that fit in a 2×2 grid are marked **Inventory or crafting table**. Tag ingredients, such as any plank, show an **Any** badge. Furnace recipes that also work in a blast furnace, smoker, or campfire say so on the same furnace layout. Netherite gear is not crafted on these three stations; its card explains the smithing-table upgrade.

## Requirements

- Node.js 22 or newer
- [pnpm](https://pnpm.io/) 10

## Scripts

| Script           | What it does                                                                         |
| ---------------- | ------------------------------------------------------------------------------------ |
| `pnpm dev`       | Start the Next.js app                                                                |
| `pnpm build`     | Production build                                                                     |
| `pnpm start`     | Serve the production build                                                           |
| `pnpm test`      | Run the Vitest unit tests                                                            |
| `pnpm lint`      | Lint with ESLint                                                                     |
| `pnpm format`    | Format with Prettier                                                                 |
| `pnpm typecheck` | Typecheck with `tsc --noEmit`                                                        |
| `pnpm commit`    | Create a [Conventional Commit](https://www.conventionalcommits.org/) with Commitizen |
| `pnpm release`   | Bump the version, changelog, and tag from those commits                              |
| `pnpm data:sync` | Rebuild recipes, names, and item images                                              |

Husky runs Prettier and ESLint on staged files, then a full typecheck, before each commit. Commitlint checks the message.

## Project layout

The UI follows atomic design:

- `src/components/atoms` — `Slot`, `ItemIcon`, `Button`, `Badge`, `Text`, `Logo`
- `src/components/molecules` — crafting grid, furnace, brewing stand, item button, search, category filter
- `src/components/organisms` — recipe panel, item catalog, site header
- `src/components/templates` — the single guide page
- `src/app` — Next.js route, global styles, favicon
- `src/lib` — recipe normalization, catalog filtering, formatting
- `src/data` — category rules, how-to-get notes, potion names and colors
- `src/data/generated` — recipes and names produced by `pnpm data:sync`
- `public/items` — item images
- `public/brand` — logo and mark

## Recipes and images

`pnpm data:sync` clones the Minecraft **26.3** data and assets from [misode/mcmeta](https://github.com/misode/mcmeta) into `.cache/` (gitignored), then writes:

- `src/data/generated/recipes.json` — shaped crafting, shapeless crafting, transmute recipes, smelting (with blast furnace, smoker, and campfire noted on the same recipe), and brewing
- `src/data/generated/items.json` — display names
- `src/data/generated/meta.json` — the game version
- `public/items/<id>.png` — the first frame of each item or block texture

Brewing recipes come from the 26.3 data pack (`minecraft:brewing`). Potion bottle colors are applied in `src/data/brewing.ts`. A few blocks that do not read well as a flat texture, such as grass, chests, and beds, are replaced with inventory icons from the [Minecraft Wiki](https://minecraft.wiki/w/Item) when that download succeeds.

The sync skips recipe families that are not a single grid: smithing, stonecutting, armor trims, banner copies, firework stars, dyed leather, and tipped arrows. Firework rockets and decorated pots are added as one representative recipe each. The version pin is `GAME_VERSION` at the top of `scripts/sync-game-data.ts`.

You do not need to run the sync to start the app. The generated files are already in the repository. Run it when you want to refresh them. That needs git, network access, and a few minutes.

### Add a brewing note or rename a potion

Edit `src/data/brewing.ts`. `potionName` builds the label from the language file, then adds `(extended)` or a level. `potionColor` is the liquid color used the next time you sync images.

### Move an item to another category

Edit `categorize` in `src/data/categories.ts`. Explicit sets are checked before suffixes. The catalog is built when the app loads, so a category change does not need a new sync.

### Add a “how to get” line

Add the item id to `EXPLICIT` in `src/data/how-to-get.ts`. The recipe panel shows that line, plus up to two notes for ingredients.

## Tests

```bash
pnpm test
```

Unit tests cover the slot, the three stations, the item button, recipe normalization (shaped pickaxe, shapeless stew, tag ingredient, furnace iron, awkward potion), and catalog search plus category filtering.

## License

GNU General Public License v3. See [LICENSE](LICENSE).
