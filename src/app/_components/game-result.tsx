"use client";
import React from "react";
import { RiTwitterXFill } from "@remixicon/react";
import {
  useGameTimesPlayed,
  useGameTotalVictories,
  useGameVictoryStreak,
} from "../state";
import Image from "next/image";

export default function GameResult() {
  const timesPlayed = useGameTimesPlayed();
  const totalVictories = useGameTotalVictories();
  const victoryStreak = useGameVictoryStreak();

  return (
    <>
      <div className="mb-14 mt-12 grid w-full gap-3 sm:grid-cols-3">
        <div className="rounded-sm border border-border/10 bg-white/5 p-3 text-center">
          <div className="mb-2 text-2xl font-bold">{timesPlayed}</div>
          <div className="text-sm text-muted">Jogos</div>
        </div>
        <div className="rounded-sm border border-border/10 bg-white/5 p-3 text-center">
          <div className="mb-2 text-2xl font-bold">
            {parseFloat(((totalVictories / timesPlayed) * 100).toFixed(2))}%
          </div>
          <div className="text-sm text-muted">De vitórias</div>
        </div>
        <div className="relative rounded-sm border border-border/10 bg-white/5 p-3 text-center">
          <div className="mb-2 text-2xl font-bold">🔥{victoryStreak}</div>
          <div className="text-sm text-muted">Sequência de vitórias</div>
          <Image
            className="absolute -bottom-16 -right-5 size-28 rotate-12 sm:bottom-[unset] sm:right-0 sm:top-0 sm:-translate-y-1/2 sm:translate-x-1/2"
            style={{
              filter:
                "drop-shadow(0px 2px 0px white) drop-shadow(0px -2px 0px white) drop-shadow(2px 0px 0px white) drop-shadow(-2px 0px 0px white)",
            }}
            src="/favicon.webp"
            width={500}
            height={500}
            quality={100}
            alt="Orbit-chan"
          />
        </div>
      </div>

      <div className="flex w-48 flex-col items-center gap-4">
        <div className="text-center">
          Conheça&nbsp;as&nbsp;redes&nbsp;sociais da Orbit Station!
        </div>
        <div className="flex gap-4">
          <a href="https://x.com/orbit_stt" target="_blank">
            <RiTwitterXFill />
          </a>
        </div>
      </div>
    </>
  );
}
