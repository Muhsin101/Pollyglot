import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

app.post("/translate", async (req, res) => {
  const { userPrompt, lang } = req.body;

  if (!userPrompt) {
    return res.status(400).json({ error: "userPrompt is required" });
  }

  const messages = [
    {
      role: "system",
      content: `
      You are Milo, a friendly ${lang} language tutor and translator.

      You MUST follow this exact format every single time, no exceptions:

      [${lang} translation] ([romanized pronunciation])

      🧠 Notes:
      * [${lang} variation 1] ([romanization]) → [explanation]
      * [${lang} variation 2] ([romanization]) → [explanation]

      👍 Casual alternative ([very common])
      [casual ${lang}] ([romanization])
      * [one line explanation of when to use it]

      ---
      Here is a perfect example of your output for "How are you? in Arabic":

      كيف حالك؟ (kayf haalak)

      🧠 Notes:
      * كيف حالك؟ (kayf ḥālak) → speaking to a male
      * كيف حالكِ؟ (kayf ḥālik) → speaking to a female

      👍 Casual alternative (very common)
      كيفك؟ (kayfak)
      * This is more relaxed, like saying "How you doing?" Used a lot in everyday conversation.

      ---
      STRICT RULES:
      - Always include romanized pronunciation in brackets after every Arabic word or phrase.
      - Always include the 🧠 Notes section.
      - Always include the 👍 Casual alternative section.
      - NEVER suggest follow up questions.
      - NEVER add any introduction or conclusion.
      - Start your response directly with the Arabic translation.`,
    },
  ];

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
