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
      const history = await apiService.getHistory(type);
      set({ history, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add new history entry
  addHistoryEntry: async (requestData, responseData) => {
    try {
      const historyEntry = {
        method: requestData.method,
        url: requestData.url,
        headers: requestData.headers,
        body: requestData.body,
        responseStatus: responseData.status,
        responseBody: responseData.body,
        responseHeaders: responseData.headers,
        responseTime: responseData.time,
        requestType: requestData.type || "REST",
      };

      const newEntry = await apiService.addHistory(historyEntry);

      // Add to local state
      set((state) => ({
        history: [newEntry, ...state.history],
      }));

      return newEntry;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  // Delete history entry
  deleteHistoryEntry: async (id) => {
    try {
      await apiService.deleteHistory(id);

      // Remove from local state
      set((state) => ({
        history: state.history.filter((entry) => entry.id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  // Toggle star status
  toggleHistoryStar: async (id) => {
    try {
      const result = await apiService.toggleStar(id);

      // Update local state
      set((state) => ({
        history: state.history.map((entry) =>
          entry.id === id ? { ...entry, is_starred: result.is_starred } : entry
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  // Clear all history
  clearAllHistory: async (type = null) => {
    try {
      await apiService.clearHistory(type);

      // Clear local state
      if (type) {
        set((state) => ({
          history: state.history.filter((entry) => entry.request_type !== type),
        }));
      } else {
        set({ history: [] });
      }
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useHistoryStore;
