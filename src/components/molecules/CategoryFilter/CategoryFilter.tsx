"use client";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { CATEGORIES } from "@/data/categories";
import { cn } from "@/lib/cn";
import type { CategoryId } from "@/lib/types";

type CategoryFilterProps = {
  value: CategoryId | "all";
  onChange: (value: CategoryId | "all") => void;
};

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <ScrollArea.Root className="w-full">
      <ScrollArea.Viewport className="w-full pb-2">
        <ToggleGroup.Root
          type="single"
          value={value}
          onValueChange={(next) => {
            if (next) onChange(next as CategoryId | "all");
          }}
          aria-label="Item categories"
          className="flex w-max gap-1"
        >
          <FilterItem value="all" current={value}>
            All
          </FilterItem>
          {CATEGORIES.map((category) => (
            <FilterItem key={category.id} value={category.id} current={value}>
              {category.label}
            </FilterItem>
          ))}
        </ToggleGroup.Root>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal" className="flex h-2 touch-none">
        <ScrollArea.Thumb className="relative flex-1 rounded-full bg-gray-300 dark:bg-gray-700" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

function FilterItem({
  value,
  current,
  children,
}: {
  value: string;
  current: string;
  children: React.ReactNode;
}) {
  const selected = value === current;
  return (
    <ToggleGroup.Item
      value={value}
      className={cn(
        "rounded-md border px-2.5 py-1 text-xs font-medium whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        selected
          ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300",
      )}
    >
      {children}
    </ToggleGroup.Item>
  );
}
