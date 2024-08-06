"use client";

import React from "react";
import Image from "next/image";
import Guesses, { type GuessesProps } from "./guesses";
import AnimeInfo from "./anime-info";
import GameResult from "./game-result";
import { useGameView } from "../state";
import { AnimatePresence, motion } from "framer-motion";

export default function Game(props: GuessesProps) {
  const view = useGameView();

  return (
    <div className="relative flex flex-col items-center justify-center gap-10">
      <AnimatePresence mode="popLayout">
        {view === "game" && (
          <motion.div
            key={"game"}
            className="absolute top-0 flex w-max flex-col items-center justify-center gap-10"
            exit={{ opacity: 0, x: -100 }}
          >
            <Image
              className="rounded-[2px] blur-sm"
              src={props.todayAnime.image}
              alt="Capa do anime"
              width={257}
              height={382}
            />

            <Guesses {...props} />
          </motion.div>
        )}
        {view === "result" && (
          <div className="absolute top-0">
            <motion.div
              key={"animeInfo"}
              className="flex w-max flex-col items-center justify-center gap-10"
              initial={{ opacity: 0, x: 234 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AnimeInfo anime={props.todayAnime} />
            </motion.div>
            <motion.div
              key={"gameResults"}
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <GameResult />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
