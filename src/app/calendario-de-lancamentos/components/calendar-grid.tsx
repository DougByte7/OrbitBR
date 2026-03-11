"use client";

import { useSearchParams } from "next/navigation";
import type { AniListMedia } from "../interfaces";
import HoverTrailerCard from "./hover-trailer-card";
import Highlight from "./highlight";
import { cn } from "@/lib/utils";

export interface WeekDay {
  dayIndex: number;
  label: string;
  isToday: boolean;
}

interface CalendarGridProps {
  animes: AniListMedia[];
  weekDays: WeekDay[];
}

export default function CalendarGrid({ animes, weekDays }: CalendarGridProps) {
  const searchParams = useSearchParams();

  const selectedGenres = (searchParams.get("genres") ?? "")
    .split(",")
    .filter(Boolean);
  const genreMode = searchParams.get("genreMode") ?? "or";
  const genreAction = searchParams.get("genreAction") ?? "show";

  function isVisible(anime: AniListMedia): boolean {
    if (selectedGenres.length === 0) return true;
    const match =
      genreMode === "and"
        ? selectedGenres.every((g) => anime.genres.includes(g))
        : selectedGenres.some((g) => anime.genres.includes(g));
    return genreAction === "show" ? match : !match;
  }

  const animesByWeek = animes.reduce(
    (acc, anime) => {
      const dayIndex = new Date(
        anime.nextAiringEpisode!.airingAt * 1000,
      ).getDay();
      if (acc[dayIndex]) {
        acc[dayIndex]!.push(anime);
      } else {
        acc[dayIndex] = [anime];
      }
      return acc;
    },
    [] as Array<AniListMedia[]>,
  );

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(150px,_250px))] items-baseline justify-center gap-4">
      {weekDays.map((day) => (
        <div key={day.dayIndex} className="relative">
          {day.isToday && <Highlight />}
          <div className="relative -z-20 rounded-t-sm border-[2px] border-transparent bg-primary px-1 text-center text-lg uppercase">
            {day.label}
          </div>

          <div className="grid w-full justify-items-center gap-2 rounded-b-sm border border-border/10 bg-white/5 p-3 text-center">
            {animesByWeek[day.dayIndex]?.map((anime, j) => (
              <div
                key={anime.id}
                className={cn(
                  "grid w-full justify-items-center gap-2",
                  !isVisible(anime) && "hidden",
                )}
              >
                {j !== 0 && (
                  <div className="h-2 w-full border-t border-border/10" />
                )}
                <HoverTrailerCard anime={anime} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
