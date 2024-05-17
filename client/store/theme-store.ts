import {create} from 'zustand';

interface ThemeStoreState {
    darkMode: boolean;
    setDarkMode: () => void;
}

const useThemeStore = create<ThemeStoreState>((set) => ({
    darkMode: true,
    setDarkMode: () => set((state) => ({ darkMode:  !state.darkMode })),
  }))

export default useThemeStore;