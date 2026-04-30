const userInput = document.getElementById("user-input");
const translateBtn = document.getElementById("translate-btn");
const outputEl = document.getElementById("output-container");
const form = document.getElementById("translate-form");

function start() {
  translateBtn.addEventListener("click", handleTranslationRequest);
  form.addEventListener("submit", handleTranslationRequest);
}

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

async function handleTranslationRequest(e) {
  e.preventDefault();

  const userPrompt = userInput.value.trim();
  if (!userPrompt) return;

  messages.push({
    role: "user",
    content: userPrompt,
  });

  try {
    const response = await fetch("http://localhost:3000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPrompt }),
    });

    const data = await response.json();
    const { translatedText } = data;
    console.log(data);

    const unsafeHTML = marked.parse(data.translatedText);
    const safeHTML = DOMPurify.sanitize(unsafeHTML);

    outputEl.innerHTML = safeHTML;

    console.log(translatedText);
  } catch (error) {
    console.log(error);
    outputEl.innerHTML = `
    <p>
        Sorry I cannot access what I need to at the moment. Please try again later.
    </p>
    `;
  }
}

start();
