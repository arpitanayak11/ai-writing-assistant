require("dotenv").config();
const express = require("express");
const cors = require("cors");
const analyzeRoute = require("./routes/analyze");
const grammarCheckRoute = require("./routes/grammarcheck");
const spellCheckRoute = require("./routes/spellCheck");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/analyze", analyzeRoute);
app.use("/api/grammarcheck", grammarCheckRoute);
app.use("/api/spellCheck", spellCheckRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
