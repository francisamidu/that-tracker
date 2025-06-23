import ky from "ky";

const api = ky.create({
  // prefixUrl: "https://that-tracker-backend.onrender.com/api",
  prefixUrl: "http://localhost:3001/api",
  headers: {
    Accept: "application/json",
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
