import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  view: "game" | "result";
};

type Actions = {
  actions: {
    showResult: () => void;
  };
};

const useGameStore = create<State & Actions>()(
  immer((set) => ({
    view: "game",
    actions: {
      showResult() {
        set((state) => {
          state.view = "result";
        });
      },
    },
  })),
);

export const useGameActions = () => useGameStore((state) => state.actions);
export const useGameView = () => useGameStore((state) => state.view);
