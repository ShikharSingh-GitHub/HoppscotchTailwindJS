import { create } from "zustand";

const useRequestStore = create((set) => ({
  isRequested: false,
  requested: () => set((state) => ({ isRequested: !state.isRequested })),
  restoreFromHistory: (historyEntry) => {
    try {
      // Parse headers if they're stored as a string
      const parsedHeaders =
        typeof historyEntry.headers === "string"
          ? JSON.parse(historyEntry.headers || "{}")
          : historyEntry.headers || {};

      // Convert headers to the format expected by your UI
      const formattedHeaders = Object.entries(parsedHeaders).map(
        ([key, value]) => ({
          key,
          value,
          active: true,
        })
      );

      // Update the store
      set({
        url: historyEntry.url || "",
        method: historyEntry.method || "GET",
        headers: formattedHeaders,
        params: [], // You could parse these from the URL if needed
        body: historyEntry.body || "",
        // Add other properties as needed
      });

      console.log(
        "Successfully restored request from history:",
        historyEntry.id
      );
    } catch (error) {
      console.error("Failed to restore from history:", error);
    }
  },
}));

export default useRequestStore;
