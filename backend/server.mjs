import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const geminiKey = process.env.GEMINI_API_KEY;

if (!geminiKey) {
  console.error("❌ Missing GEMINI_API_KEY in .env");
  process.exit(1);
}

// Allow multiple frontend dev ports for CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5174",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Simple cache (5 minutes)
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 5;

app.post("/search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query?.trim()) return res.json([]);

    const lowerQuery = query.toLowerCase();
    const cached = cache.get(lowerQuery);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json(cached.data);
    }

    // Free trial model
    const url = `https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:generateText?key=${geminiKey}`;

    const prompt = `List only real shoe names related to "${query}" (brand and model).
Return output strictly as a JSON array like:
["Nike Air Force 1", "Adidas Ultraboost", "Puma RS-X"]`;

    const apiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        temperature: 0.5,
        maxOutputTokens: 200,
      }),
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error("❌ Gemini API Error:", errText);
      return res
        .status(500)
        .json({ error: "Gemini API failed", details: errText });
    }

    const data = await apiRes.json();
    const text = data?.candidates?.[0]?.output || "[]";

    // Parse JSON safely
    let results = [];
    try {
      results = JSON.parse(text);
    } catch {
      results = text
        .replace(/[\[\]"]/g, "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Cache results
    cache.set(lowerQuery, { data: results, timestamp: Date.now() });

    res.json(results);
  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Gemini backend running at http://localhost:${PORT}`)
);
