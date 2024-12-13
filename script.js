document.getElementById('send-button').addEventListener('click', function() {
    const input = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');

    if (input.value.trim()) {
        const userMessage = document.createElement('div');
        userMessage.classList.add('message', 'user');
        userMessage.innerText = input.value;
        chatBox.appendChild(userMessage);

        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot');
        botMessage.innerText = generateBotResponse(input.value);
        chatBox.appendChild(botMessage);

        input.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

function generateBotResponse(userMessage) {
    const responses = [
        "I'm not sure about that.",
        "Can you elaborate?",
        "Let me think about it.",
        "Hmm, that's interesting."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}
