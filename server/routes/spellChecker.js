const express = require("express");
const axios = require("axios");
const spellCheckRoute = express.Router();

spellCheckRoute.post("/", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/chat",
      {
        model: "command-a-03-2025",
        message: `Correct any spelling errors in this text and return only the corrected version:\n"${text}"`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Cohere chat API now returns 'response.data.text'
    const correctedText = response.data?.text?.trim() || "Spell check failed.";
    res.status(200).json({ result: correctedText });
  } catch (error) {
    console.error("Spell Check Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Spell check failed." });
  }
});

module.exports = spellCheckRoute;
