import { create } from "zustand";

export const useHeaderSlicers = create((set) => ({
  search: null,
  setSearch: (search: any) => set({ search }),
}));
