import { create } from "zustand";

interface Pagenation {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  resetPageNumber: () => void;
}

const usePaginationStore = create<Pagenation>((set) => ({
  pageNumber: 1,
  setPageNumber: (pageNumber) => set({ pageNumber }),
  resetPageNumber: () => set({ pageNumber: 1 }),
}));

export default usePaginationStore;
