import { Slot } from "@/components/atoms/Slot/Slot";
import type { Ingredient } from "@/lib/types";

export type SlotData = {
  ingredient: Ingredient | null;
  name?: string;
  image?: string;
  anyNames?: string[];
};

type CraftingGridProps = {
  grid: SlotData[][];
  result: SlotData & { count: number };
  onSelect?: (itemId: string) => void;
};

export function CraftingGrid({ grid, result, onSelect }: CraftingGridProps) {
  const rows = [0, 1, 2].map((row) => grid[row] ?? []);

  return (
    <div className="flex flex-wrap items-center gap-3" aria-label="Crafting table">
      <div className="grid grid-cols-3 gap-1">
        {rows.flatMap((row, rowIndex) =>
          [0, 1, 2].map((column) => {
            const cell = row[column];
            return (
              <Slot
                key={`${rowIndex}-${column}`}
                ingredient={cell?.ingredient ?? null}
                name={cell?.name}
                image={cell?.image}
                anyNames={cell?.anyNames}
                onSelect={onSelect}
              />
            );
          }),
        )}
      </div>
      <Arrow />
      <Slot
        ingredient={result.ingredient}
        name={result.name}
        image={result.image}
        count={result.count}
        onSelect={onSelect}
      />
    </div>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 text-gray-400" aria-hidden="true">
      <path d="M5 12h12M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
