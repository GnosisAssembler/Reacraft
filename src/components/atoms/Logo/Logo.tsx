export function Logo({ wordmark = true }: { wordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="8" className="fill-gray-900 dark:fill-gray-950" />
        <rect x="5" y="5" width="6" height="6" rx="1" className="fill-gray-600" />
        <rect x="13" y="5" width="6" height="6" rx="1" className="fill-gray-600" />
        <rect x="21" y="5" width="6" height="6" rx="1" className="fill-gray-600" />
        <rect x="5" y="13" width="6" height="6" rx="1" className="fill-gray-600" />
        <rect x="13" y="13" width="6" height="6" rx="1" className="fill-blue-500" />
        <rect x="21" y="13" width="6" height="6" rx="1" className="fill-gray-600" />
        <rect x="5" y="21" width="6" height="6" rx="1" className="fill-gray-600" />
        <rect x="13" y="21" width="6" height="6" rx="1" className="fill-emerald-400" />
        <rect x="21" y="21" width="6" height="6" rx="1" className="fill-gray-600" />
      </svg>
      {wordmark ? (
        <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-50">
          Reacraft
        </span>
      ) : null}
    </span>
  );
}
