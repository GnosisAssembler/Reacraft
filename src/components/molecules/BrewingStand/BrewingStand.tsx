import { Slot } from "@/components/atoms/Slot/Slot";
import { Arrow } from "@/components/molecules/CraftingGrid/CraftingGrid";
import type { SlotData } from "@/components/molecules/CraftingGrid/CraftingGrid";

type BrewingStandProps = {
  ingredient: SlotData;
  fuel: SlotData;
  base: SlotData;
  result: SlotData & { count: number };
  onSelect?: (itemId: string) => void;
};

export function BrewingStand({ ingredient, fuel, base, result, onSelect }: BrewingStandProps) {
  return (
    <div className="flex flex-wrap items-center gap-3" aria-label="Brewing stand">
      <div className="grid justify-items-center gap-1">
        <Slot
          ingredient={ingredient.ingredient}
          name={ingredient.name}
          image={ingredient.image}
          anyNames={ingredient.anyNames}
          onSelect={onSelect}
        />
        <Slot
          ingredient={fuel.ingredient}
          name={fuel.name ?? "Blaze powder fuel"}
          image={fuel.image}
          onSelect={onSelect}
        />
        <div className="flex gap-1">
          {[0, 1, 2].map((index) => (
            <Slot
              key={index}
              ingredient={base.ingredient}
              name={base.name}
              image={base.image}
              onSelect={onSelect}
            />
          ))}
        </div>
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
