"use client";
import { gameStorage } from "@/constants/localStorage";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { differenceInDays, isYesterday } from "date-fns";
import { revalidatePath } from "next/cache";

type State = {
  view: "game" | "result";
  lifes: number;
  timesPlayed: number;
  totalVictories: number;
  victoryStreak: number;
  lastPlayed: number;
};

type Actions = {
  actions: {
    loseLife: () => void;
    gameWin: () => void;
    resetView: () => void;
  };
};

const useGameStore = create<State & Actions>()(
  persist(
    immer((set, get) => ({
      view: "game",
      lifes: 5,
      timesPlayed: 0,
      totalVictories: 0,
      victoryStreak: 0,
      lastPlayed: 0,
      actions: {
        gameWin() {
          set((state) => {
            state.view = "result";
            state.timesPlayed += 1;
            state.totalVictories += 1;
            const now = new Date();
            const lastPlayed = new Date(state.lastPlayed);

            const playedToday =
              now.toDateString() === lastPlayed.toDateString();

            const playedYesterdayAfterMidDay =
              isYesterday(lastPlayed) && lastPlayed.getHours() >= 12;

            const playedLastGame = playedYesterdayAfterMidDay || playedToday;

            state.victoryStreak = playedLastGame ? state.victoryStreak + 1 : 1;
            // Keep last
            state.lastPlayed = now.getTime();
          });
        },
        loseLife() {
          set((state) => {
            state.lifes -= 1;
            if (state.lifes !== 0) return;

            state.view = "result";
            state.timesPlayed += 1;
            state.victoryStreak = 0;
            state.lastPlayed = new Date().getTime();
          });
        },
        resetView() {
          set((state) => {
            const now = new Date();
            const lastPlayed = new Date(state.lastPlayed);

            const playedYesterdayBeforeMidDay =
              isYesterday(lastPlayed) && lastPlayed.getHours() < 12;
            const playedYesterdayAfterMidDay =
              isYesterday(lastPlayed) && lastPlayed.getHours() >= 12;
            const playedTwoOrMoreDaysAgo =
              differenceInDays(now, lastPlayed) >= 2;
            const playedTodayBeforeMidDay =
              now.toDateString() === lastPlayed.toDateString() &&
              lastPlayed.getHours() < 12;

            const canPlayToday =
              playedTodayBeforeMidDay ||
              playedYesterdayBeforeMidDay ||
              (playedYesterdayAfterMidDay && now.getHours() >= 12) ||
              playedTwoOrMoreDaysAgo;

            if (canPlayToday && state.view === "result") {
              state.lifes = 5;
              state.view = "game";
            }
          });
        },
      },
    })),
    {
      name: gameStorage,
      partialize: (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { actions, ...rest } = state;
        return rest;
      },
    },
  ),
);

export const useGameActions = () => useGameStore((state) => state.actions);
export const useGameView = () => useGameStore((state) => state.view);
export const useGameLifes = () => useGameStore((state) => state.lifes);
export const useGameTimesPlayed = () =>
  useGameStore((state) => state.timesPlayed);
export const useGameTotalVictories = () =>
  useGameStore((state) => state.totalVictories);
export const useGameVictoryStreak = () =>
  useGameStore((state) => state.victoryStreak);
