// const express = require("express");
// const axios = require("axios");
// const analyzeRoute = express.Router();

// analyzeRoute.post("/", async (req, res) => {
//   const { sentence } = req.body;

//   try {
//     const response = await axios.post(
//       "https://api.cohere.ai/v1/chat",
//       {
//         model: "command-r-08-2024",
//         message: `Rephrase the following sentence in three different ways. Return only the rephrased versions, separated by new lines.\n"${sentence}"`,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const text = response.data?.text?.trim() || "No response";
//     const rephrasedSentences = text.split("\n").filter((s) => s.trim());
//     res.status(200).json({ result: rephrasedSentences });
//   } catch (error) {
//     console.error("Error processing sentence:", error.response?.data || error.message);
//     res.status(500).json({ error: "Error processing sentence" });
//   }
// });

// module.exports = analyzeRoute;
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const analyzeRoute = express.Router();

analyzeRoute.post("/", async (req, res) => {
  const { sentence } = req.body;

  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/chat",
      {
        model: "command-a-03-2025", // ✅ The latest Cohere model (your API supports this)
        message: `Rephrase this sentence naturally without changing its meaning: "${sentence}"`,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const resultText =
      response.data?.text?.trim() ||
      response.data?.generations?.[0]?.text?.trim() ||
      "Rephrasing failed.";

    res.status(200).json({ result: resultText });
  } catch (error) {
    console.error("Error processing sentence:", error.response?.data || error.message);
    res.status(500).json({ error: "Error processing sentence" });
  }
});

module.exports = analyzeRoute;
