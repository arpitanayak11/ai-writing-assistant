require("dotenv").config();
const cohere = require("cohere-ai");
cohere.init(process.env.COHERE_API_KEY);
const express = require("express");
const grammarCheckRoute = express.Router();
const axios = require("axios");

grammarCheckRoute.post("/", async (req, res) => {
  const { text } = req.body;
  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/generate",
      {
        model: "command", // or "command-light"
        prompt: `Correct the grammar of this text: "${text}"\nOnly return the corrected version.`,
        max_tokens: 150,
        temperature: 0.7,
        k: 1,
        stop_sequences: [],
        return_likelihoods: "NONE",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        },
      }
    );

    const correctedText = response.data.generations[0].text.trim();
    // res.status(200).json(correctedText || []);
    res.status(200).json({ result: correctedText });
  } catch (error) {
    console.log(error?.response?.data || error);
    res.status(500).json({ error: error.message });
  }
});

//export
module.exports = grammarCheckRoute;
