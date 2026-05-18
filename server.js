import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "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";

app.post("/chat", async (req, res) => {
  const message = req.body.message;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: message
    })
  });

  const data = await response.json();

  res.json({
    reply: data.output[0].content[0].text
  });
});

app.listen(3000, () => {
  console.log("Server running");
});
