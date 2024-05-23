// store/useExampleStore.ts
import { create } from "zustand";

type Example = {
  input: string;
  output: string;
};

type ExampleState = {
  example: Example[];
  setExample: (newExample: Example) => void;
};

const useExampleStore = create<ExampleState>((set) => ({
  example: [],
  setExample: (newExample) =>
    set((state) => ({
      example: [...state.example, newExample],
    })),
}));

export default useExampleStore;
