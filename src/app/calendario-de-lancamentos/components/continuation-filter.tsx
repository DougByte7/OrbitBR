"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ContinuationFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value = searchParams.get("continuation") ?? "all";

  function setFilter(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "all") params.delete("continuation");
    else params.set("continuation", next);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Tipo:</span>
      <Button
        size="sm"
        variant={value === "all" ? "default" : "outline"}
        onClick={() => setFilter("all")}
      >
        Todos
      </Button>
      <Button
        size="sm"
        variant={value === "new" ? "default" : "outline"}
        onClick={() => setFilter("new")}
      >
        Inéditos
      </Button>
      <Button
        size="sm"
        variant={value === "continuation" ? "default" : "outline"}
        onClick={() => setFilter("continuation")}
      >
        Continuações
      </Button>
    </div>
  );
}
