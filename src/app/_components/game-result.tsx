"use client";
import React from "react";
import { RiInstagramFill, RiTwitterXFill } from "@remixicon/react";
import {
  useGameTimesPlayed,
  useGameTotalVictories,
  useGameVictoryStreak,
} from "../state";

export default function GameResult() {
  const timesPlayed = useGameTimesPlayed();
  const totalVictories = useGameTotalVictories();
  const victoryStreak = useGameVictoryStreak();

  return (
    <>
      <div className="my-12 grid w-full gap-3 sm:grid-cols-3">
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
        <div className="rounded-sm border border-border/10 bg-white/5 p-3 text-center">
          <div className="mb-2 text-2xl font-bold">🔥{victoryStreak}</div>
          <div className="text-sm text-muted">Sequência de vitórias</div>
        </div>
      </div>

      <div className="flex w-48 flex-col items-center gap-4">
        <div className="text-center">
          Conheça&nbsp;as&nbsp;redes&nbsp;sociais da Orbit Station!
        </div>
        <div className="flex gap-4">
          <RiInstagramFill />
          <a href="https://x.com/orbit_stt" target="_blank">
            <RiTwitterXFill />
          </a>
        </div>
      </div>
    </>
  );
}
