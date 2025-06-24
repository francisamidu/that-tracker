import ky from "ky";

const api = ky.create({
  prefixUrl: "https://jvjdyvelpzuxzcfcinpp.supabase.co/functions/v1/express",
  // prefixUrl: "http://localhost:3001/api",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
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
