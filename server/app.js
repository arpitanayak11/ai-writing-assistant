require("dotenv").config();
const express = require("express");
const cors = require("cors");
const analyzeRoute = require("./routes/analyze");
const grammarCheckRoute = require("./routes/grammarChecker");
const spellCheckRoute = require("./routes/spellChecker");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/analyze", analyzeRoute);
app.use("/api/grammarcheck", grammarCheckRoute);
app.use("/api/spellcheck", spellCheckRoute);

app.listen(PORT, () => {
  console.log(`🌸 Cohere AI Writing App running at http://localhost:${PORT}`);
});
