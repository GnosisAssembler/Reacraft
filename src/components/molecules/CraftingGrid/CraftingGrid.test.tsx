import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as Tooltip from "@radix-ui/react-tooltip";
import { CraftingGrid } from "@/components/molecules/CraftingGrid/CraftingGrid";
import type { Ingredient } from "@/lib/types";

const stick: Ingredient = { itemId: "stick" };
const diamond: Ingredient = { itemId: "diamond" };

function cell(ingredient: Ingredient | null, name?: string) {
  return { ingredient, name, image: ingredient ? `/items/${ingredient.itemId}.png` : undefined };
}

describe("CraftingGrid", () => {
  it("renders nine input slots and the result count", () => {
    const view = render(
      <Tooltip.Provider>
        <CraftingGrid
          grid={[
            [cell(diamond, "Diamond"), cell(diamond, "Diamond"), cell(diamond, "Diamond")],
            [cell(null), cell(stick, "Stick"), cell(null)],
            [cell(null), cell(stick, "Stick"), cell(null)],
          ]}
          result={{
            ingredient: { itemId: "diamond_pickaxe" },
            name: "Diamond Pickaxe",
            image: "/items/diamond_pickaxe.png",
            count: 1,
          }}
          onSelect={vi.fn()}
        />
      </Tooltip.Provider>,
    );

    expect(view.getByLabelText("Crafting table").querySelectorAll("button")).toHaveLength(6);
    expect(view.getByRole("button", { name: "Diamond Pickaxe" })).toBeInTheDocument();
  });

  it("shows an output count above one", () => {
    const view = render(
      <Tooltip.Provider>
        <CraftingGrid
          grid={[
            [cell(null), cell(null), cell(null)],
            [cell(null), cell(null), cell(null)],
            [cell(null), cell(null), cell(null)],
          ]}
          result={{
            ingredient: { itemId: "stick" },
            name: "Stick",
            image: "/items/stick.png",
            count: 4,
          }}
        />
      </Tooltip.Provider>,
    );
    expect(view.getByText("4")).toBeInTheDocument();
  });
});
