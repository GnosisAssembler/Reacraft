"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Text } from "@/components/atoms/Text/Text";
import { ItemCatalog } from "@/components/organisms/ItemCatalog/ItemCatalog";
import { RecipePanel } from "@/components/organisms/RecipePanel/RecipePanel";
import { SiteHeader } from "@/components/organisms/SiteHeader/SiteHeader";
import { catalog, meta } from "@/lib/game-data";
import type { CategoryId } from "@/lib/types";

export function GuideTemplate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("item");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");

  function selectItem(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("item", id);
    router.replace(`/?${params.toString()}`, { scroll: false });
    if (window.innerWidth < 1024) {
      document
        .getElementById("recipe-panel")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50">
        <SiteHeader version={meta.name} />
        <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[400px_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-4 lg:self-start">
            <RecipePanel itemId={itemId} onSelect={selectItem} />
          </div>
          <ItemCatalog
            items={catalog}
            selectedId={itemId}
            query={query}
            category={category}
            onQuery={setQuery}
            onCategory={setCategory}
            onSelect={selectItem}
          />
        </main>
        <footer className="mx-auto max-w-7xl px-4 pb-8">
          <Text size="xs" tone="muted">
            Recipes and item textures come from Minecraft Java Edition {meta.name}. Reacraft is free
            software under the GNU GPL v3.
          </Text>
        </footer>
      </div>
    </Tooltip.Provider>
  );
}
