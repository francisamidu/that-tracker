import ky from "ky";

const api = ky.create({
  prefixUrl: "https://that-tracker-backend.onrender.com",
});

const getTrackingData = async (trackingNumber: string) => {
  const response = await api.get(`track?tracking_number=${trackingNumber}`);
  return response.json();
};

export { getTrackingData };
