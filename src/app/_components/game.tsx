"use client";

import React, { useEffect, useState } from "react";
import Guesses, { type GuessesProps } from "./guesses";
import AnimeInfo from "./anime-info";
import GameResult from "./game-result";
import { useGameLifes, useGameView } from "../state";
import { AnimatePresence, motion } from "framer-motion";

export default function Game(props: GuessesProps) {
  const view = useGameView();

  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-10">
      <AnimatePresence mode="popLayout">
        {view === "game" && (
          <motion.div
            key={"game"}
            className="absolute top-0 flex w-max flex-col items-center justify-center gap-10"
            exit={{ opacity: 0, x: -100 }}
          >
            <PixelatedImage
              src={`https://utfs.io/f/${props.todayAnime.cover}`}
            />

            <Guesses {...props} />
          </motion.div>
        )}
        {view === "result" && (
          <div className="absolute top-0 pb-32">
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

interface PixelatedImageProps {
  src: string;
}
function PixelatedImage({ src }: PixelatedImageProps) {
  const [imgSrc, setSrc] = useState("");
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const lifes = useGameLifes();
  const amountForLife = [0.75, 0.8, 0.85, 0.9, 0.95];
  const amount = 1 - amountForLife[lifes - 1]!;

  useEffect(() => {
    const width = 257;
    const height = 382;
    const canvas = document.createElement("canvas");
    canvas.style.display = "none";
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    const w = width * amount;
    const h = height * amount;

    if (image) {
      ctx.drawImage(image, 0, 0, w, h);
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
      setSrc(canvas.toDataURL("image/png"));

      return;
    }

    const newImage = new Image();
    newImage.crossOrigin = "anonymous";
    newImage.src = src;
    newImage.onload = () => {
      ctx.drawImage(newImage, 0, 0, w, h);
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
      setSrc(canvas.toDataURL("image/jpg"));
      setImage(image);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lifes, src]);

  return imgSrc ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="rounded-[2px]"
      src={imgSrc}
      alt="Capa do anime"
      width={257}
      height={382}
    />
  ) : (
    <div className="flex h-[382px] w-[257px] items-center justify-center">
      <div
        className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
