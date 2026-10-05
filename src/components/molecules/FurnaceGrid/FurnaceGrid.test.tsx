import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FurnaceGrid } from "@/components/molecules/FurnaceGrid/FurnaceGrid";

describe("FurnaceGrid", () => {
  it("shows the input, fuel, and result", () => {
    const view = render(
      <Tooltip.Provider>
        <FurnaceGrid
          input={{
            ingredient: { itemId: "raw_iron" },
            name: "Raw Iron",
            image: "/items/raw_iron.png",
          }}
          fuel={{ ingredient: { itemId: "coal" }, name: "Any fuel", image: "/items/coal.png" }}
          result={{
            ingredient: { itemId: "iron_ingot" },
            name: "Iron Ingot",
            image: "/items/iron_ingot.png",
            count: 1,
          }}
          onSelect={vi.fn()}
        />
      </Tooltip.Provider>,
    );

    expect(view.getByLabelText("Furnace")).toBeInTheDocument();
    expect(view.getByRole("button", { name: "Raw Iron" })).toBeInTheDocument();
    expect(view.getByRole("button", { name: "Any fuel" })).toBeInTheDocument();
    expect(view.getByRole("button", { name: "Iron Ingot" })).toBeInTheDocument();
  });
});
