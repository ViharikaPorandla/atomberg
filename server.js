import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const BASE_URL = "https://developer.atomberg-iot.com/v1";

/* 1. Get Access Token */
app.post("/access-token", async (req, res) => {
  const { apiKey, refreshToken } = req.body;

  try {
    const response = await fetch(`${BASE_URL}/auth/access_token`, {
      headers: {
        "x-api-key": apiKey,
        "Authorization": refreshToken
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Access token failed" });
  }
});

/* 2. Get Devices */
app.post("/devices", async (req, res) => {
  const { apiKey, accessToken } = req.body;

  try {
    const response = await fetch(`${BASE_URL}/devices`, {
      headers: {
        "x-api-key": apiKey,
        "Authorization": accessToken
      }
    });

    const data = await response.json();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Device fetch failed" });
  }
});

/* 3. Get Device State */
app.post("/device/:id", async (req, res) => {
  const { apiKey, accessToken } = req.body;

  const response = await fetch(
    `${BASE_URL}/devices/${req.params.id}`,
    {
      headers: {
        "x-api-key": apiKey,
        "Authorization": accessToken
      }
    }
  );

  const data = await response.json();
  res.json(data);
});

/* 4. Send Command */
app.post("/command/:id", async (req, res) => {
  const { apiKey, accessToken, command, value } = req.body;

  await fetch(`${BASE_URL}/devices/${req.params.id}/command`, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "Authorization": accessToken,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ command, value })
  });

  res.json({ status: "success" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);
