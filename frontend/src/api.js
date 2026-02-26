const BASE_URL = import.meta.env.MODE === "production" ? "" : "http://localhost:8000";

export async function uploadAudio(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/upload`, { method: "POST", body: formData });
  if (!response.ok) throw new Error("Upload failed!");
  return response.json();
}