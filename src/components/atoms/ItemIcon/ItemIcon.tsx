"use client";

import { useState } from "react";

type ItemIconProps = {
  src: string;
  alt?: string;
  size?: number;
};

export function ItemIcon({ src, alt = "", size = 32 }: ItemIconProps) {
  const [failed, setFailed] = useState(false);

  return (
    // Inventory icons are already small local PNGs, so the image element keeps them pixelated.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed ? "/items/missing.svg" : src}
      alt={alt}
      width={size}
      height={size}
      className="pixelated object-contain"
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
    />
  );
}
