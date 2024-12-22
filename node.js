const axios = require("axios");

const url = "https://raw.githubusercontent.com/zeftahost/yaaja/main/data.json";

async function fetchData() {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();
