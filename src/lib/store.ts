import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  theme: 'light' | 'dark';
  reducedMotion: boolean;
  currentSection: string;
  setTheme: (theme: 'light' | 'dark') => void;
  setReducedMotion: (reduced: boolean) => void;
  setCurrentSection: (section: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      reducedMotion: false,
      currentSection: 'hero',
      setTheme: (theme) => set({ theme }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setCurrentSection: (currentSection) => set({ currentSection }),
    }),
    {
      name: 'boss-portfolio-settings',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);