"use client";
import { Button } from "@/components/ui/button";
import { WandSparkles } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import animeDB from "public/anime-db";
import Image from "next/image";
import { useState } from "react";
import { useGameActions, useGameLifes } from "../state";
import { nanoid } from "@/lib/nanoid";

export interface Anime {
  _id: string;
  title: string;
  genres: string[];
  image: string;
  status: string;
  synopsis: string;
  author: string;
  availableAt: string;
}
export interface GuessesProps {
  todayAnime: Anime;
  animeList: string[];
}
export default function Guesses({ todayAnime, animeList }: GuessesProps) {
  const [wrongGuesses, setWrongGuess] = useState<(Anime & { id: string })[]>(
    [],
  );
  const [currentGuess, setCurrentGuess] = useState<string | undefined>("");
  const { showResult, loseLife } = useGameActions();
  const lifes = useGameLifes();

  const handleGuess = () => {
    const guessedAnime = (animeDB as Anime[]).find(
      (a) => a.title.toLocaleLowerCase() === currentGuess?.toLocaleLowerCase(),
    );

    if (!guessedAnime) return;

    const userDataKey = "user:data";
    const userData = JSON.parse(
      localStorage.getItem(userDataKey) ??
        '{"played":0,"victories":0,"sequence":0,"lastPlayed":0}',
    ) as {
      played: number;
      victories: number;
      sequence: number;
      lastPlayed: number;
    };

    userData.played += 1;
    userData.lastPlayed = new Date().getTime();

    if (userData.lastPlayed === 0) {
      localStorage.removeItem(userDataKey);
    }

    if (todayAnime.title === guessedAnime.title) {
      userData.victories += 1;
      userData.sequence += 1;

      localStorage.setItem(userDataKey, JSON.stringify(userData));
      showResult();
      return;
    }

    if (!(lifes - 1)) {
      localStorage.setItem(userDataKey, JSON.stringify(userData));
      showResult();
      return;
    }

    loseLife();
    setWrongGuess((prev) => {
      return [{ ...guessedAnime, id: nanoid(10) }, ...prev];
    });
  };

  return (
    <div className="grid gap-10">
      <div className="flex items-center gap-2 sm:gap-4">
        <Combobox
          placeholder="Qual anime está buscando?"
          options={animeList}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
          onChange={setCurrentGuess as any}
        />

        <Button disabled={!currentGuess} onClick={handleGuess}>
          <WandSparkles size={20} />
          <span className="hidden sm:inline">Adivinhar</span>
        </Button>
      </div>
      <div className="grid gap-3">
        <p className="my-4 text-center text-sm">
          Você tem {lifes} tentativas restantes
        </p>
        {wrongGuesses.map((guess) => {
          return (
            <div
              key={guess.id}
              className="flex w-full gap-3 rounded-[2px] border-l-4 border-[#FF3434] bg-error px-4 py-2"
            >
              <Image
                className="rounded-[2px]"
                src={guess.image}
                alt={`Capa do anime: ${guess.title}`}
                width={34}
                height={46}
              />
              <div>
                <div className="font-bold">{guess.title}</div>
                <div className="text-sm">{guess.genres.join(", ")}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
