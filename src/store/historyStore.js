import { create } from "zustand";
import apiService from "../services/api";

const useHistoryStore = create((set, get) => ({
  history: [],
  loading: false,
  error: null,

  // Fetch history from backend
  fetchHistory: async (type = null) => {
    set({ loading: true, error: null });
    try {
      console.log("Fetching history...");
      const response = await apiService.getHistory();
      console.log("History fetched successfully:", response);
      set({ history: response.data || [], loading: false });
    } catch (error) {
      console.error("Error fetching history:", error);
      set({ error: error.message, loading: false });
    }
  },

  // Add new history entry
  addHistoryEntry: async (requestData) => {
    try {
      console.log("Adding history entry:", requestData);
      const response = await apiService.addToHistory(requestData);
      console.log("History entry added successfully:", response);

      // Refresh the history list
      await get().fetchHistory();
      return response;
    } catch (error) {
      console.error("Error adding to history:", error);
      set({ error: error.message });
      throw error;
    }
  },

  // Delete history entry
  deleteHistoryEntry: async (id) => {
    try {
      await apiService.deleteHistory(id);

      // Remove from local state
      const currentHistory = get().history;
      const updatedHistory = currentHistory.filter((entry) => entry.id !== id);
      set({ history: updatedHistory });
    } catch (error) {
      console.error("Error deleting history entry:", error);
      set({ error: error.message });
      throw error;
    }
  },

  // Toggle history star
  toggleHistoryStar: async (id) => {
    try {
      await apiService.toggleHistoryStar(id);

      // Update local state
      const currentHistory = get().history;
      const updatedHistory = currentHistory.map((entry) =>
        entry.id === id ? { ...entry, is_starred: !entry.is_starred } : entry
      );
      set({ history: updatedHistory });
    } catch (error) {
      console.error("Error toggling history star:", error);
      set({ error: error.message });
      throw error;
    }
  },

  // Clear all history
  clearAllHistory: async (type = null) => {
    try {
      await apiService.clearAllHistory();
      set({ history: [] });
    } catch (error) {
      console.error("Error clearing history:", error);
      set({ error: error.message });
      throw error;
    }
  },

  // Restore history entry
  restoreFromHistory: (historyEntry) => {
    set({
      url: historyEntry.url,
      method: historyEntry.method,
      headers: JSON.parse(historyEntry.headers || "{}"),
      params: [], // You might want to parse these from the URL
      body: historyEntry.body || "",
    });
  },
}));

export default useHistoryStore;
