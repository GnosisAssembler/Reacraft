import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Slot } from "@/components/atoms/Slot/Slot";

function renderSlot(ui: React.ReactElement) {
  return render(<Tooltip.Provider>{ui}</Tooltip.Provider>);
}

describe("Slot", () => {
  it("renders an empty slot without a button", () => {
    const view = renderSlot(<Slot ingredient={null} />);
    expect(view.queryByRole("button")).not.toBeInTheDocument();
  });

  it("selects the item when the slot is clicked", async () => {
    const onSelect = vi.fn();
    const view = renderSlot(
      <Slot
        ingredient={{ itemId: "stick" }}
        name="Stick"
        image="/items/stick.png"
        onSelect={onSelect}
      />,
    );
    await userEvent.click(view.getByRole("button", { name: "Stick" }));
    expect(onSelect).toHaveBeenCalledWith("stick");
  });

  it("marks a tag ingredient as any", () => {
    const view = renderSlot(
      <Slot
        ingredient={{ itemId: "oak_planks", anyOf: ["oak_planks", "spruce_planks"] }}
        name="Oak Planks"
        image="/items/oak_planks.png"
        anyNames={["Oak Planks", "Spruce Planks"]}
        onSelect={vi.fn()}
      />,
    );
    expect(view.getByText("Any")).toBeInTheDocument();
  });
});
