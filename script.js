document.getElementById("sendButton").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    const responseContainer = document.getElementById("responseContainer");

    if (!userInput) {
        alert("Harap masukkan pertanyaan.");
        return;
    }

    responseContainer.innerHTML = "<p><strong>Loading...</strong></p>";

    const apiKey = "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"; // Ganti dengan API key Anda
    const url = "https://api.openai.com/v1/completions";

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userInput,
            max_tokens: 100,
            temperature: 0.7
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        responseContainer.innerHTML = `<p><strong>Response:</strong> ${data.choices[0].text}</p>`;
    } catch (error) {
        responseContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
