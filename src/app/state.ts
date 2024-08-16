"use client";
import { gameStorage } from "@/constants/localStorage";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { addDays, isWithinInterval, subDays, subMilliseconds } from "date-fns";
import { resetTime } from "@/constants/gameResetTime";

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

            const prevGameTimeStart = subDays(
              now.getHours() >= resetTime
                ? now.setHours(resetTime, 0, 0, 0)
                : subDays(now, 1).setHours(resetTime, 0, 0, 0),
              1,
            );
            const prevGameTimeEnd = subMilliseconds(
              addDays(prevGameTimeStart, 1),
              1,
            );

            const playedLastGame = isWithinInterval(lastPlayed, {
              start: prevGameTimeStart,
              end: prevGameTimeEnd,
            });

            state.victoryStreak = playedLastGame ? state.victoryStreak + 1 : 1;
            // Keep last
            state.lastPlayed = new Date().getTime();
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
            if (state.view === "game") return;

            const now = new Date();
            const lastPlayed = new Date(state.lastPlayed);

            const gameTimeStart =
              now.getHours() >= resetTime
                ? now.setHours(resetTime, 0, 0, 0)
                : subDays(now, 1).setHours(resetTime, 0, 0, 0);
            const gameTimeEnd = subMilliseconds(addDays(gameTimeStart, 1), 1);

            if (
              isWithinInterval(lastPlayed, {
                start: gameTimeStart,
                end: gameTimeEnd,
              })
            )
              return;

            state.lifes = 5;
            state.view = "game";
            location.reload();
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
