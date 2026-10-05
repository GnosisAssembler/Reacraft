import { Slot } from "@/components/atoms/Slot/Slot";
import { Arrow } from "@/components/molecules/CraftingGrid/CraftingGrid";
import type { SlotData } from "@/components/molecules/CraftingGrid/CraftingGrid";

type FurnaceGridProps = {
  input: SlotData;
  fuel: SlotData;
  result: SlotData & { count: number };
  onSelect?: (itemId: string) => void;
};

export function FurnaceGrid({ input, fuel, result, onSelect }: FurnaceGridProps) {
  return (
    <div className="flex flex-wrap items-center gap-3" aria-label="Furnace">
      <div className="grid gap-1">
        <Slot
          ingredient={input.ingredient}
          name={input.name}
          image={input.image}
          anyNames={input.anyNames}
          onSelect={onSelect}
        />
        <Flame />
        <Slot
          ingredient={fuel.ingredient}
          name={fuel.name ?? "Any fuel"}
          image={fuel.image}
          onSelect={onSelect}
        />
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

function Flame() {
  return (
    <svg viewBox="0 0 24 24" className="mx-auto size-6 text-orange-500" aria-hidden="true">
      <path
        d="M12 2s2 3 2 5-1 3-1 3 3-1 4 3 0 7-5 9-7-2-7-6 3-6 3-6-1 2 0 3 2-4 4-11z"
        fill="currentColor"
      />
    </svg>
  );
}
