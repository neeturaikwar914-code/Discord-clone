import axios from "axios";

const API_BASE = "https://kri-lion.onrender.com";

const API = axios.create({
  baseURL: API_BASE,
});

export const startAudioJob = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);
  
  return API.post("/upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onUploadProgress(percent);
    },
  });
};

export const checkJobStatus = async (jobId) => {
  const response = await API.get(`/status/${jobId}`);
  return response.data;
};

export default API;