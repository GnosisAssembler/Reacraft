import { Suspense } from "react";
import { GuideTemplate } from "@/components/templates/GuideTemplate/GuideTemplate";

export default function HomePage() {
  return (
    <Suspense fallback={<p className="p-6 text-sm text-gray-500">Loading the guide…</p>}>
      <GuideTemplate />
    </Suspense>
  );
}
