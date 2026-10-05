"use client";

import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Logo } from "@/components/atoms/Logo/Logo";
import { Text } from "@/components/atoms/Text/Text";

export function SiteHeader({ version }: { version: string }) {
  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <div>
          <h1 className="sr-only">Reacraft</h1>
          <Logo />
          <Text size="xs" tone="muted" className="mt-1 max-w-xl">
            Not an official Minecraft product. Not approved by or associated with Mojang or
            Microsoft.
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="blue">Java Edition {version}</Badge>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function ThemeToggle() {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <Button onClick={toggle} aria-label="Toggle color theme">
      <span className="dark:hidden">Dark</span>
      <span className="hidden dark:inline">Light</span>
    </Button>
  );
}
