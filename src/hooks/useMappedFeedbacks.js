import { useState, useEffect } from "react";
import { api } from "../config/api-connection-config";
import { axiosRequest } from "../config/axiosCrud";

export const useMappedFeedbacks = () => {
  const [mappedFeedbacks, setMappedFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMappedFeedbacks = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = "/feedbacks/count/by-neighborhood/all";
        const response = await axiosRequest(api, url);

        if (response.success) {
          setMappedFeedbacks(response.data);
          console.log("Mapped Feedbacks:", response.data);
        } else {
          setError(response.message || "Failed to fetch mapped feedbacks");
          console.error(
            "Error fetching mapped feedbacks:",
            response.message || "Unknown error"
          );
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMappedFeedbacks();
  }, []);

  return { mappedFeedbacks, loading, error };
};
