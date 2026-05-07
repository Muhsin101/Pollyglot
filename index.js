const userInput = document.getElementById("user-input");
const translateBtn = document.getElementById("translate-btn");
const outputEl = document.getElementById("output-container");
const arabBtn = document.getElementById("arab-btn");
const espBtn = document.getElementById("esp-btn");
const japBtn = document.getElementById("jap-btn");
const form = document.getElementById("translate-form");
let lang;

function start() {
  translateBtn.addEventListener("click", handleTranslationRequest);
  form.addEventListener("submit", handleTranslationRequest);
}

async function handleTranslationRequest(e) {
  e.preventDefault();

  const userPrompt = userInput.value.trim();
  if (!userPrompt) return;

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

japBtn.addEventListener("click", () => {
  lang = "Spanish";
});

arabBtnBtn.addEventListener("click", () => {
  lang = "Arabic";
});

japBtn.addEventListener("click", () => {
  lang = "Japnese";
});

start();
