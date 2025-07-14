require("dotenv").config();
const cohere = require("cohere-ai");
cohere.init(process.env.COHERE_API_KEY);
const express = require("express");
const axios = require("axios");
const analyzeRoute = express.Router();

analyzeRoute.post("/", async (req, res) => {
  const { sentence } = req.body;
  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/generate",
      {
        model: "command", // or "command-light"
        prompt: `Rephrase this sentence: "${sentence}"\nOnly return the rephrased version.`,
        max_tokens: 150,
        temperature: 0.7,
        k: 3,
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

    const rephrasedSentences = response.data.generations.map((gen) =>
      gen.text.trim()
    );
    // res.status(200).json(rephrasedSentences || []);
    res.status(200).json({ result: rephrasedSentences });
  } catch (error) {
    console.log(error?.response?.data || error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = analyzeRoute;
