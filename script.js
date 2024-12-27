const chatBox = document.getElementById("chat-box");

function appendMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${sender}`;
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const userInput = document.getElementById("user-input");
  const message = userInput.value.trim();

  if (!message) return;

  // Tampilkan pesan pengguna
  appendMessage(message, "user");
  userInput.value = "";

  // Tampilkan "sedang mengetik..."
  appendMessage("Sedang mengetik...", "bot");

  try {
    // Kirim permintaan ke API OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `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`, // Ganti dengan API key OpenAI Anda
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Anda bisa mengganti model jika perlu
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    // Hapus pesan "sedang mengetik..."
    chatBox.lastChild.remove();

    // Tampilkan respons dari bot
    appendMessage(data.choices[0].message.content, "bot");
  } catch (error) {
    console.error("Error:", error);
    chatBox.lastChild.remove();
    appendMessage("Maaf, terjadi kesalahan. Coba lagi nanti.", "bot");
  }
}
