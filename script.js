require('dotenv').config();
const axios = require('axios');

// Ambil API Key dari environment variables
const apiKey = process.env.API_KEY;
const apiEndpoint = 'https://api.openai.com/v1/completions';

// Validasi API Key
if (!apiKey) {
    console.error("API Key tidak ditemukan. Pastikan file .env sudah diatur dengan benar.");
    process.exit(1);
}

// Ambil prompt dari CLI atau gunakan default jika kosong
const prompt = process.argv.slice(2).join(" ") || "Halo, AI sayang";

// Validasi prompt
if (!prompt) {
    console.error("Prompt tidak boleh kosong. Masukkan teks setelah menjalankan skrip.");
    process.exit(1);
}

// Fungsi untuk mendapatkan respons dari API OpenAI
async function getAIResponse(prompt) {
    const konfigurasi = {
        method: 'post',
        url: apiEndpoint,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        timeout: 10000, // Timeout 10 detik
        data: {
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2048,
            temperature: 1,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        },
    };

    try {
        console.log("Mengirim permintaan ke API...");
        const respons = await axios(konfigurasi);

        // Validasi respons
        if (respons.data.choices && respons.data.choices.length > 0) {
            console.log("Respons berhasil diterima:");
            console.log(respons.data.choices[0].text.trim());
        } else {
            console.error("Respons tidak mengandung data yang valid.");
        }
    } catch (error) {
        // Penanganan error
        if (error.response) {
            console.error(`Error HTTP ${error.response.status}: ${error.response.statusText}`);
            console.error("Detail Error:", error.response.data);
        } else {
            console.error("Error lain:", error.message);
        }
    }
}

// Jalankan fungsi dengan prompt
getAIResponse(prompt);
