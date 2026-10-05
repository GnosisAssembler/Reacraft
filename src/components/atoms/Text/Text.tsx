import { cn } from "@/lib/cn";

type TextProps = {
  as?: "p" | "span" | "h1" | "h2" | "h3";
  tone?: "default" | "muted" | "strong";
  size?: "xs" | "sm" | "base" | "lg";
  className?: string;
  children: React.ReactNode;
};

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

const tones = {
  default: "text-gray-700 dark:text-gray-300",
  muted: "text-gray-500 dark:text-gray-400",
  strong: "text-gray-900 dark:text-gray-50",
};

export function Text({ as = "p", tone = "default", size = "sm", className, children }: TextProps) {
  const Tag = as;
  return <Tag className={cn(sizes[size], tones[tone], className)}>{children}</Tag>;
}
