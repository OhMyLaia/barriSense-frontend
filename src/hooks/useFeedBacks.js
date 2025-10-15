import { useEffect, useState } from "react";
import api from "../config/api-connection-config.js";
import { axiosRequest } from "../api/axiosCrud.js";

// Create an Axios instance (you can also import a shared one if you already have it)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const useFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError(null);

    const response = await axiosRequest(api, "/feedbacks");

    if (response.success) {
      setFeedbacks(response.data);
    } else {
      setError(response.message || "Failed to fetch feedbacks");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return {
    feedbacks,
    loading,
    error,
    refetch: fetchFeedbacks,
  };
};
