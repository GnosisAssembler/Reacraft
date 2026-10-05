import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as Tooltip from "@radix-ui/react-tooltip";
import { BrewingStand } from "@/components/molecules/BrewingStand/BrewingStand";

describe("BrewingStand", () => {
  it("shows the ingredient, fuel, three bottles, and result", () => {
    const view = render(
      <Tooltip.Provider>
        <BrewingStand
          ingredient={{
            ingredient: { itemId: "nether_wart" },
            name: "Nether Wart",
            image: "/items/nether_wart.png",
          }}
          fuel={{
            ingredient: { itemId: "blaze_powder" },
            name: "Blaze powder (fuel)",
            image: "/items/blaze_powder.png",
          }}
          base={{
            ingredient: { itemId: "potion_water" },
            name: "Water Bottle",
            image: "/items/potion_water.png",
          }}
          result={{
            ingredient: { itemId: "potion_awkward" },
            name: "Awkward Potion",
            image: "/items/potion_awkward.png",
            count: 1,
          }}
          onSelect={vi.fn()}
        />
      </Tooltip.Provider>,
    );

    expect(view.getByLabelText("Brewing stand")).toBeInTheDocument();
    expect(view.getAllByRole("button", { name: "Water Bottle" })).toHaveLength(3);
    expect(view.getByRole("button", { name: "Nether Wart" })).toBeInTheDocument();
    expect(view.getByRole("button", { name: "Awkward Potion" })).toBeInTheDocument();
  });
});
