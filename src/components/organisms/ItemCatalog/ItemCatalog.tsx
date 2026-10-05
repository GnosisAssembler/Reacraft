"use client";

import { Text } from "@/components/atoms/Text/Text";
import { CategoryFilter } from "@/components/molecules/CategoryFilter/CategoryFilter";
import { ItemButton } from "@/components/molecules/ItemButton/ItemButton";
import { SearchField } from "@/components/molecules/SearchField/SearchField";
import { CATEGORIES } from "@/data/categories";
import { filterCatalog } from "@/lib/catalog";
import type { CatalogItem, CategoryId } from "@/lib/types";

type ItemCatalogProps = {
  items: CatalogItem[];
  selectedId: string | null;
  query: string;
  category: CategoryId | "all";
  onQuery: (value: string) => void;
  onCategory: (value: CategoryId | "all") => void;
  onSelect: (itemId: string) => void;
};

export function ItemCatalog({
  items,
  selectedId,
  query,
  category,
  onQuery,
  onCategory,
  onSelect,
}: ItemCatalogProps) {
  const filtered = filterCatalog(items, query, category);
  const groups = CATEGORIES.map((entry) => ({
    ...entry,
    items: filtered.filter((item) => item.category === entry.id),
  })).filter((group) => group.items.length > 0);

  return (
    <section className="space-y-4">
      <SearchField value={query} onChange={onQuery} />
      <CategoryFilter value={category} onChange={onCategory} />
      <Text size="xs" tone="muted">
        {filtered.length} items
      </Text>
      {groups.length === 0 ? <Text>No items match that search.</Text> : null}
      {groups.map((group) => (
        <div key={group.id} className="space-y-2">
          <Text as="h2" tone="strong" className="font-semibold">
            {group.label}
          </Text>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-2">
            {group.items.map((item) => (
              <ItemButton
                key={item.id}
                item={item}
                selected={item.id === selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
