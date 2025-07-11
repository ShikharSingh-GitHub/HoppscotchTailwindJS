import { create } from "zustand";

const useRequestStore = create((set) => ({
  isRequested: false,
  requested: () => set((state) => ({ isRequested: !state.isRequested })),
}));

export default useRequestStore;
