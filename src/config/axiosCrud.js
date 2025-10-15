import axios from "axios";

// 🔧 Helper for consistent error logging
const logAxiosError = (error, action, id) => {
  if (axios.isAxiosError(error)) {
    const target = id ? ` (id: ${id})` : "";
    console.error(`❌ Axios error during ${action}${target}: ${error.message}`);
    if (error.response?.data)
      console.error("API Response:", error.response.data);
  } else {
    console.error(`⚠️ Unexpected error during ${action}:`, error);
  }
};

// 🟢 CREATE (POST) — body is optional (if undefined, no body is sent)
export const axiosCreate = async (api, endpoint, body) => {
  try {
    const response = body
      ? await api.post(endpoint, body)
      : await api.post(endpoint);
    return { success: true, data: response.data };
  } catch (error) {
    logAxiosError(error, "create");
    return { success: false, data: null };
  }
};

// 🔵 READ (GET)
export const axiosRequest = async (api, url, queryParams = {}) => {
  try {
    const { data } = await api.get(url, { params: queryParams });
    return { success: true, data };
  } catch (error) {
    logAxiosError(error, "read");
    return {
      success: false,
      name: error.name || "Error",
      message: error.message,
      status: error.response?.status,
    };
  }
};

// 🟠 UPDATE (PUT)
export const axiosUpdate = async (api, endpoint, id, updatedObj) => {
  try {
    const { data } = await api.put(`${endpoint}/${id}`, updatedObj);
    return { success: true, data };
  } catch (error) {
    logAxiosError(error, "update", id);
    return { success: false, data: null };
  }
};

// 🔴 DELETE
export const axiosDelete = async (api, endpoint, id) => {
  try {
    await api.delete(`${endpoint}/${id}`);
    console.info(`✅ Object deleted successfully (id: ${id}).`);
    return { success: true };
  } catch (error) {
    logAxiosError(error, "delete", id);
    return { success: false };
  }
};
