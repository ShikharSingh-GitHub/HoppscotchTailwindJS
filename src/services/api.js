const API_BASE_URL = "http://localhost:5001/api";

class ApiService {
  constructor() {
    // make sure this matches your backend port + base path
    this.baseURL = "http://localhost:5001/api";
  }

  // Test connection method
  async testConnection() {
    try {
      const response = await fetch("http://localhost:5001/health");
      return await response.json();
    } catch (error) {
      console.error("Backend connection test failed:", error);
      throw error;
    }
  }

  // History methods
  async getHistory() {
    try {
      const response = await fetch(`${this.baseURL}/history`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Get history failed:", error);
      throw error;
    }
  }

  async addToHistory(requestData) {
    console.log("Sending to history:", requestData);
    try {
      const response = await fetch(`${this.baseURL}/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        console.error(
          `Server returned ${response.status}: ${await response.text()}`
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Add to history failed:", error);
      throw error;
    }
  }

  async deleteHistory(id) {
    try {
      const response = await fetch(`${this.baseURL}/history/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete history failed:", error);
      throw error;
    }
  }

  async toggleHistoryStar(id) {
    try {
      const response = await fetch(`${this.baseURL}/history/${id}/star`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Toggle history star failed:", error);
      throw error;
    }
  }

  async clearAllHistory() {
    try {
      const response = await fetch(`${this.baseURL}/history/clear`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Clear all history failed:", error);
      throw error;
    }
  }
}

// Create and export a single instance
const apiService = new ApiService();
export default apiService;
