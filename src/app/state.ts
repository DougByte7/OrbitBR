import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  view: "game" | "result";
  lifes: number;
};

type Actions = {
  actions: {
    showResult: () => void;
    loseLife: () => void;
  };
};

const getInitialView = (): State["view"] => {
  if (typeof window === "undefined") return "game";

  const { lastPlayed } = JSON.parse(
    localStorage.getItem("user:data") ??
      '{"played":0,"victories":0,"sequence":0,"lastPlayed":0}',
  ) as {
    played: number;
    victories: number;
    sequence: number;
    lastPlayed: number;
  };

  return lastPlayed &&
    new Date(lastPlayed).toLocaleDateString() ===
      new Date().toLocaleDateString()
    ? "result"
    : "game";
};

const useGameStore = create<State & Actions>()(
  immer((set) => ({
    view: getInitialView(),
    lifes: 5,
    actions: {
      showResult() {
        set((state) => {
          state.view = "result";
        });
      },
      loseLife() {
        set((state) => {
          state.lifes -= 1;
        });
      },
    },
  })),
);

export const useGameActions = () => useGameStore((state) => state.actions);
export const useGameView = () => useGameStore((state) => state.view);
export const useGameLifes = () => useGameStore((state) => state.lifes);
