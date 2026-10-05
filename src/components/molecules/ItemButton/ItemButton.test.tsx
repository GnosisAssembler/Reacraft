import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ItemButton } from "@/components/molecules/ItemButton/ItemButton";
import type { CatalogItem } from "@/lib/types";

const stick: CatalogItem = {
  id: "stick",
  name: "Stick",
  category: "basic",
  image: "/items/stick.png",
};

describe("ItemButton", () => {
  it("reports the selected item", async () => {
    const onSelect = vi.fn();
    const view = render(<ItemButton item={stick} selected onSelect={onSelect} />);
    const button = view.getByRole("button", { name: "Stick" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(button);
    expect(onSelect).toHaveBeenCalledWith("stick");
  });
});
