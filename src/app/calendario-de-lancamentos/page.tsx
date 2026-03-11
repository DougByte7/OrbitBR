import TopBar from "@/components/top-bar";
import { addDays } from "date-fns";
import { Calendar } from "lucide-react";
import { Suspense } from "react";
import type { AniListPageResponse } from "./interfaces";
import GenreFilter from "./components/genre-filter";
import ContinuationFilter from "./components/continuation-filter";
import SeasonYearControls from "./components/season-year-controls";
import CalendarGrid from "./components/calendar-grid";
import type { WeekDay } from "./components/calendar-grid";
import { genreMap, themeMap } from "@/constants/animes";
import { gql, GraphQLClient } from "graphql-request";

const gqlClient = new GraphQLClient("https://graphql.anilist.co");

const SEASON_QUERY = gql`
  query ($season: MediaSeason, $seasonYear: Int) {
    Page(perPage: 50) {
      media(
        type: ANIME
        season: $season
        seasonYear: $seasonYear
        sort: POPULARITY_DESC
      ) {
        id
        title {
          romaji
          english
          native
        }
        status
        episodes
        genres
        coverImage {
          large
        }
        description(asHtml: false)
        trailer {
          id
          site
        }
        nextAiringEpisode {
          airingAt
          episode
        }
        streamingEpisodes {
          site
          url
        }
        relations {
          edges {
            relationType
          }
        }
      }
    }
  }
`;

const VALID_SEASONS = new Set(["WINTER", "SPRING", "SUMMER", "FALL"]);

function getCurrentSeason(): { season: string; seasonYear: number } {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  if (month <= 3) return { season: "WINTER", seasonYear: year };
  if (month <= 6) return { season: "SPRING", seasonYear: year };
  if (month <= 9) return { season: "SUMMER", seasonYear: year };
  return { season: "FALL", seasonYear: year };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { season: defaultSeason, seasonYear: defaultYear } = getCurrentSeason();
  const params = await searchParams;

  const rawSeason = (params.season ?? "").toUpperCase();
  const season = VALID_SEASONS.has(rawSeason) ? rawSeason : defaultSeason;
  const seasonYear = Number(params.year) || defaultYear;

  return (
    <main className="flex flex-col items-center justify-center gap-10 px-4 pb-32">
      <TopBar />

      <div className="flex items-center gap-2">
        <Calendar />
        <h1 className="text-3xl font-bold">Calendário de Lançamentos</h1>
      </div>

      <Suspense fallback={<Spinner />}>
        <WeeklyCalendar season={season} seasonYear={seasonYear} />
      </Suspense>
    </main>
  );
}

async function WeeklyCalendar({
  season,
  seasonYear,
}: {
  season: string;
  seasonYear: number;
}) {
  const today = new Date();

  const rawDays = Array(7)
    .fill(today)
    .map((_, i) => addDays(today, i))
    .sort((a, b) => a.getDay() - b.getDay());

  const weekDays: WeekDay[] = rawDays.map((day) => ({
    dayIndex: day.getDay(),
    label: day
      .toLocaleDateString("pt-BR", { weekday: "long" })
      .replace("-feira", ""),
    isToday: day.getDay() === today.getDay(),
  }));

  const { Page } = await gqlClient.request<AniListPageResponse>(SEASON_QUERY, {
    season,
    seasonYear,
  });

  const animes = Page.media.filter((anime) => anime.nextAiringEpisode !== null);

  const allGenres = Array.from(
    new Set(animes.flatMap((a) => a.genres)),
  ).toSorted((a, b) =>
    (genreMap.get(a) ?? themeMap.get(a) ?? a).localeCompare(
      genreMap.get(b) ?? themeMap.get(b) ?? b,
    ),
  );

  return (
    <>
      <div className="flex w-full flex-wrap items-start justify-center gap-8">
        <SeasonYearControls />
        <ContinuationFilter />
        <GenreFilter allGenres={allGenres} />
      </div>
      <CalendarGrid animes={animes} weekDays={weekDays} />
    </>
  );
}

function Spinner() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="h-8 w-8 animate-spin fill-primary text-gray-200 dark:text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.44684 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
