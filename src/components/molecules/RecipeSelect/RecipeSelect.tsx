"use client";

import * as Select from "@radix-ui/react-select";

type RecipeSelectProps = {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export function RecipeSelect({ value, options, onChange }: RecipeSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        aria-label="Recipe variant"
        className="inline-flex h-9 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-800 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
      >
        <Select.Value />
        <Select.Icon className="text-gray-400">▾</Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-50 overflow-hidden rounded-md border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-gray-900">
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="cursor-pointer rounded px-2 py-1.5 text-sm text-gray-800 outline-none data-[highlighted]:bg-gray-100 dark:text-gray-100 dark:data-[highlighted]:bg-gray-800"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
