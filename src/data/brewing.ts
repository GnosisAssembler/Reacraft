const BASE_COLORS: Record<string, string> = {
  water: "#385DC6",
  awkward: "#385DC6",
  mundane: "#6A6A6A",
  thick: "#385DC6",
  healing: "#F82423",
  harming: "#430A09",
  fire_resistance: "#E49A3A",
  regeneration: "#CD5CAB",
  strength: "#932423",
  swiftness: "#7CAFC6",
  night_vision: "#1F1FA1",
  invisibility: "#7F8392",
  water_breathing: "#2E5299",
  leaping: "#22FF4C",
  slow_falling: "#F7F8E0",
  poison: "#4E9331",
  weakness: "#484D48",
  slowness: "#5A6C81",
  turtle_master: "#586B3A",
  oozing: "#8BC34A",
  weaving: "#C8C8C8",
  infested: "#8E8E74",
  wind_charged: "#C8F0F8",
  luck: "#339900",
};

export function potionColor(type: string): string {
  const base = type.replace(/^(long_|strong_)/, "");
  return BASE_COLORS[base] ?? BASE_COLORS[type] ?? "#385DC6";
}

export function potionName(container: string, type: string, lang: Record<string, string>): string {
  const base = type.replace(/^(long_|strong_)/, "");
  const translated = lang[`item.minecraft.${container}.effect.${base}`];
  let name = translated ?? titleCase(`${container}_${base}`);
  if (type.startsWith("long_")) name = `${name} (extended)`;
  if (type.startsWith("strong_")) name = `${name} ${base === "slowness" ? "IV" : "II"}`;
  return name;
}

function titleCase(id: string): string {
  return id
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
