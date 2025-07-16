const API_BASE_URL = "http://localhost:5000/api";

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      return data;
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  // History API methods
  async getHistory(type = null, limit = 50, offset = 0) {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });

    if (type) {
      params.append("type", type);
    }

    return this.request(`/history?${params}`);
  }

  async addHistory(historyData) {
    return this.request("/history", {
      method: "POST",
      body: JSON.stringify(historyData),
    });
  }

  async deleteHistory(id) {
    return this.request(`/history/${id}`, {
      method: "DELETE",
    });
  }

  async toggleStar(id) {
    return this.request(`/history/${id}/star`, {
      method: "PATCH",
    });
  }

  async clearHistory(type = null) {
    const params = type ? `?type=${type}` : "";
    return this.request(`/history${params}`, {
      method: "DELETE",
    });
  }
}

export default new ApiService();
