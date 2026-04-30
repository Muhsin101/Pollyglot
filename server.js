import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

// Initialize messages array with system prompt
const messages = [
  {
    role: "system",
    content: `You are a Translator, you will be from English to Arabic.

    You translate loosely take into account context and motive.
    Your output must be in structured Markdown.
    Do not write introductions or conclusions.
    Start directly with the translation.

    If the user mentions a location, situation, or constraint,
    adapt the translation .

    After the translation suggest follow up questions or conversation starters.`,
  },
];

app.post("/translate", async (req, res) => {
  const { userPrompt } = req.body;

  if (!userPrompt) {
    return res.status(400).json({ error: "userPrompt is required" });
  }

  messages.push({ role: "user", content: userPrompt });

  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages,
    });

    const translatedText = response.choices[0].message.content;
    res.json({ translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Translation failed" });
  }
});

export default app;
