"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { genreMap, themeMap } from "@/constants/animes";
import { cn } from "@/lib/utils";

interface GenreFilterProps {
  allGenres: string[];
}

export default function GenreFilter({ allGenres }: GenreFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedGenres = new Set(
    (searchParams.get("genres") ?? "").split(",").filter(Boolean),
  );
  const genreMode = searchParams.get("genreMode") ?? "or";
  const genreAction = searchParams.get("genreAction") ?? "show";

  const hasSelection = selectedGenres.size > 0;

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (v === null) params.delete(k);
      else params.set(k, v);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function toggleGenre(genre: string) {
    const next = new Set(selectedGenres);
    if (next.has(genre)) next.delete(genre);
    else next.add(genre);

    updateParams({
      genres: next.size > 0 ? Array.from(next).join(",") : null,
    });
  }

  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <div className="flex flex-wrap gap-1">
        {allGenres.map((genre) => (
          <Button
            key={genre}
            size="sm"
            variant={selectedGenres.has(genre) ? "default" : "outline"}
            onClick={() => toggleGenre(genre)}
          >
            {genreMap.get(genre) ?? themeMap.get(genre) ?? genre}
          </Button>
        ))}
      </div>

      <div
        className={cn(
          "flex flex-wrap gap-4 transition-opacity",
          !hasSelection && "pointer-events-none opacity-40",
        )}
      >
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Combinar:</span>
          <Button
            size="sm"
            variant={genreMode === "or" ? "default" : "outline"}
            onClick={() => updateParams({ genreMode: "or" })}
          >
            Qualquer
          </Button>
          <Button
            size="sm"
            variant={genreMode === "and" ? "default" : "outline"}
            onClick={() => updateParams({ genreMode: "and" })}
          >
            Todos
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Ação:</span>
          <Button
            size="sm"
            variant={genreAction === "show" ? "default" : "outline"}
            onClick={() => updateParams({ genreAction: "show" })}
          >
            Exibir
          </Button>
          <Button
            size="sm"
            variant={genreAction === "hide" ? "default" : "outline"}
            onClick={() => updateParams({ genreAction: "hide" })}
          >
            Ocultar
          </Button>
        </div>
      </div>
    </div>
  );
}
