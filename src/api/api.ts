import ky from "ky";

const api = ky.create({
  prefixUrl: "http://localhost:5000/api/track",
});

const getTrackingData = async (trackingNumber: string) => {
  const response = await api.get(`?tracking_number=${trackingNumber}`);
  return response.json();
};

export { getTrackingData };
