console.log("Starting server...");

const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Your OpenWeatherMap API Key
const API_KEY = "YOUR API KEY";

app.use(express.static("public"));

app.get("/weather/:city", async (req, res) => {

    const city = req.params.city;

    try {

        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        res.json({
            city: response.data.name,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            pressure: response.data.main.pressure
        });

    } catch (error) {

        console.log("========== WEATHER API ERROR ==========");

        if (error.response) {
            console.log("Status Code :", error.response.status);
            console.log("Response    :", error.response.data);
        } else {
            console.log("Message     :", error.message);
        }

        console.log("=======================================");

        res.status(500).json({
            error: "Unable to fetch weather."
        });

    }

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
