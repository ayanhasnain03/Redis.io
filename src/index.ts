import express from "express";
import { createClient } from "redis";
const app = express();
app.use(express.json());
const client = createClient();
client.connect();

app.post("/submit", async (req, res) => {
  const problemId = req.body.problemId;
  const code = req.body.code;
  const language = req.body.language;

  try {
    await client.lPush(
      "problems",
      JSON.stringify({ code, language, problemId })
    );
    // Store in the database
    res.status(200).send("Submission received and stored.");
  } catch (error) {
    console.error("Redis error:", error);
    res.status(500).send("Failed to store submission.");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
