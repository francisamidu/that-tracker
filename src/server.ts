import axios from "axios";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Configure CORS as needed for your frontend domain

app.get("/api/track", async (req, res) => {
  const THIRD_PARTY_API_KEY = process.env.RAPID_API_KEY; // Stored securely on the server
  const THIRD_PARTY_API_HOST = process.env.RAPID_API_HOST;
  const THIRD_PARTY_API_AUTH = process.env.RAPID_API_AUTH;

  const SHIP_API_KEY = process.env.SHIP_API_KEY;

  // try {
  //   const response = await axios.get(
  //     `https://${THIRD_PARTY_API_HOST}/search?track=${req.query.tracking_number}`,
  //     {
  //       headers: {
  //         "x-rapidapi-key": THIRD_PARTY_API_KEY,
  //         "x-rapidapi-host": THIRD_PARTY_API_HOST,
  //         Authorization: `Bearer ${THIRD_PARTY_API_AUTH}`,
  //       },
  //     }
  //   );
  //   res.json(response.data);
  // } catch (error) {
  //   console.error("Error fetching data from third-party API:", error);
  //   res.status(500).json({ error: "Failed to fetch data" });
  // }
  try {
    console.log(req.query.tracking_number);
    const response = await axios.post(
      `https://api.ship24.com/public/v1/trackers/track`,
      {
        trackingNumber: req.query.tracking_number,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SHIP_API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from third-party API:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
