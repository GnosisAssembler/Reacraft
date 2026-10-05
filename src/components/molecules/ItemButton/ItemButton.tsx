"use client";

import { ItemIcon } from "@/components/atoms/ItemIcon/ItemIcon";
import { cn } from "@/lib/cn";
import type { CatalogItem } from "@/lib/types";

type ItemButtonProps = {
  item: CatalogItem;
  selected?: boolean;
  onSelect: (itemId: string) => void;
  compact?: boolean;
};

export function ItemButton({ item, selected = false, onSelect, compact = false }: ItemButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={item.name}
      onClick={() => onSelect(item.id)}
      className={cn(
        "flex cursor-pointer items-center rounded-md border text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        compact ? "gap-2 px-2 py-1.5" : "flex-col gap-1 px-2 py-2 text-center",
        selected
          ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950"
          : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800",
      )}
    >
      <ItemIcon src={item.image} size={compact ? 24 : 32} alt="" />
      <span
        className={cn(
          "text-xs text-gray-800 dark:text-gray-100",
          compact ? "truncate" : "line-clamp-2 min-h-8 w-full",
        )}
      >
        {item.name}
      </span>
    </button>
  );
}
