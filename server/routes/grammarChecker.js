const express = require("express");
const axios = require("axios");
const grammarCheckRoute = express.Router();

grammarCheckRoute.post("/", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/chat",
      {
        model: "command-r-08-2024",
        message: `Correct the grammar and punctuation errors in this text. Return only the corrected version.\n"${text}"`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const correctedText = response.data?.text?.trim() || text;
    res.status(200).json({ result: correctedText });
  } catch (error) {
    console.error("Error checking grammar:", error.response?.data || error.message);
    res.status(500).json({ error: "Error checking grammar" });
  }
});

module.exports = grammarCheckRoute;
