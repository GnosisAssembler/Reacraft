"use client";

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
        Search
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search items"
        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-50"
      />
    </label>
  );
}
