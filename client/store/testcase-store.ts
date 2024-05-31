// store/useExampleStore.ts
import { create } from "zustand";

type Testcase = {
  input: string;
  output: string;
};

type TestcaseState = {
  testcase: Testcase[];
  setTestcase: (newTestcase: Testcase) => void;
};

const useTestcaseStore = create<TestcaseState>((set) => ({
  testcase: [],
  setTestcase: (newTestcase) =>
    set((state) => ({
      testcase: [...state.testcase, newTestcase],
    })),
}));

export default useTestcaseStore;