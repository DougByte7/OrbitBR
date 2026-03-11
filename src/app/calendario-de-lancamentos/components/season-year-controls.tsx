"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Highlight from "./highlight";

const SEASONS = ["WINTER", "SPRING", "SUMMER", "FALL"] as const;
const SEASON_LABELS: Record<string, string> = {
  WINTER: "Inverno",
  SPRING: "Primavera",
  SUMMER: "Verão",
  FALL: "Outono",
};

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  if (month <= 3) return { season: "WINTER", year };
  if (month <= 6) return { season: "SPRING", year };
  if (month <= 9) return { season: "SUMMER", year };
  return { season: "FALL", year };
}

export default function SeasonYearControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaults = getCurrentSeason();

  const activeSeason = searchParams.get("season") ?? defaults.season;
  const activeYear = Number(searchParams.get("year")) || defaults.year;

  const [yearDraft, setYearDraft] = useState(String(activeYear));

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(updates)) params.set(k, v);
    // clear genre filters when changing season/year
    if ("season" in updates || "year" in updates) params.delete("genres");
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function commitYear(value: string) {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      updateParams({ year: String(num) });
      setYearDraft(String(num));
    } else {
      setYearDraft(String(activeYear));
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1">
        {SEASONS.map((season) => {
          const isCurrent = season === defaults.season && activeYear === defaults.year;
          return (
            <div key={season} className="relative">
              {isCurrent && activeSeason !== season && <Highlight />}
              <Button
                size="sm"
                variant={activeSeason === season ? "default" : "outline"}
                onClick={() => updateParams({ season })}
              >
                {SEASON_LABELS[season]}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            const y = String(activeYear - 1);
            setYearDraft(y);
            updateParams({ year: y });
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <input
          type="number"
          className="w-20 rounded-sm border border-border/10 bg-input-background px-2 py-1 text-center text-sm text-primary-foreground [appearance:textfield] focus:outline-none focus:ring-1 focus:ring-primary [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={yearDraft}
          onChange={(e) => setYearDraft(e.target.value)}
          onBlur={(e) => commitYear(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitYear(e.currentTarget.value);
          }}
        />

        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            const y = String(activeYear + 1);
            setYearDraft(y);
            updateParams({ year: y });
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
