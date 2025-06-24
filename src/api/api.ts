import ky from "ky";

const api = ky.create({
  prefixUrl: import.meta.env.VITE_APP_BACKEND_URL,
  // prefixUrl: "http://localhost:3001/api",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
    "Content-Type": "application/json",
  },
});

const getTrackingData = async (trackingNumber: string) => {
  console.log(trackingNumber);
  const response = await api.post("track", {
    body: JSON.stringify({ trackingNumber }),
  });
  return response.json();
};

export { getTrackingData };
