import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env._AI_KEY,
  baseURL: process.env.AI_URL,
});

// Initialize messages array with system prompt
const messages = [
  {
    role: "system",
    content: `You are a Translator. 

    You translate loosely take into account context and motive.
    Your output must be in structured Markdown.
    Do not write introductions or conclusions.
    Start directly with the translation.

    If the user mentions a location, situation, or constraint,
    adapt the translation .

    After the translation suggest follow up questions or conversation starters.`,
  },
];
