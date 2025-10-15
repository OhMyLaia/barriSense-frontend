import axios from "axios";

let API_BASE_URL = "http://localhost:8080/api";

// API INSTANCE
export const createApiInstance = (baseURL) => {
  return axios.create({
    baseURL,
    timeout: 3000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const api = createApiInstance(API_BASE_URL);
