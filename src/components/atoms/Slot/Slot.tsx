"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { ItemIcon } from "@/components/atoms/ItemIcon/ItemIcon";
import type { Ingredient } from "@/lib/types";

type SlotProps = {
  ingredient: Ingredient | null;
  name?: string;
  image?: string;
  anyNames?: string[];
  count?: number;
  onSelect?: (itemId: string) => void;
};

export function Slot({ ingredient, name, image, anyNames = [], count, onSelect }: SlotProps) {
  const any = Boolean(ingredient?.anyOf && ingredient.anyOf.length > 1);
  const label = name ?? (ingredient ? ingredient.itemId : "Empty slot");

  const face = (
    <span className="relative flex size-12 items-center justify-center rounded-md border border-gray-200 bg-gray-50 shadow-inner dark:border-gray-800 dark:bg-gray-950">
      {ingredient && image ? (
        <ItemIcon src={image} size={32} alt="" />
      ) : (
        <span className="size-8 rounded-sm border border-dashed border-gray-300 dark:border-gray-700" />
      )}
      {any ? (
        <span className="absolute left-0.5 top-0.5 rounded bg-white/90 px-1 text-[9px] font-semibold uppercase tracking-wide text-blue-700 dark:bg-gray-900/90 dark:text-blue-300">
          Any
        </span>
      ) : null}
      {count && count > 1 ? (
        <span className="absolute bottom-0.5 right-1 text-[11px] font-semibold tabular-nums text-gray-900 dark:text-gray-50">
          {count}
        </span>
      ) : null}
    </span>
  );

  if (!ingredient || !onSelect) {
    return (
      <span className="inline-flex" aria-hidden={ingredient ? undefined : true}>
        {face}
      </span>
    );
  }

  const detail =
    any && anyNames.length > 0
      ? `${name ?? ingredient.itemId}. Any of ${formatAny(anyNames)}.`
      : (name ?? ingredient.itemId);

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          aria-label={label}
          onClick={() => onSelect(ingredient.itemId)}
          className="cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {face}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          sideOffset={6}
          className="z-50 max-w-xs rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 shadow-md dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
        >
          {detail}
          <Tooltip.Arrow className="fill-white dark:fill-gray-900" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

function formatAny(names: string[]): string {
  const shown = names.slice(0, 8);
  const extra = names.length - shown.length;
  return extra > 0 ? `${shown.join(", ")}, and ${extra} more` : shown.join(", ");
}
