// Arrow Function
const showChart = (temperature, humidity, pressure) => {

    const ctx = document.getElementById("weatherChart");

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Temperature",
                "Humidity",
                "Pressure"
            ],

            datasets: [{

                label: "Weather Data",

                data: [
                    temperature,
                    humidity,
                    pressure
                ]

            }]

        }

    });

};


// Callback Function
const fetchData = (city, callback) => {

    fetch(`/weather/${city}`)

        .then(response => response.json())

        .then(data => callback(data))

        .catch(error => callback(null));

};


// Promise Function
const getWeatherPromise = city => {

    return new Promise((resolve, reject) => {

        fetchData(city, data => {

            if (data) {
                resolve(data);
            } 
            else {
                reject("City not found");
            }

        });

    });

};


// Async/Await Function
async function getWeather() {

    const city = document.getElementById("city").value;

    try {

        const data = await getWeatherPromise(city);

        showChart(
            data.temperature,
            data.humidity,
            data.pressure
        );

    }

    catch (error) {

        alert("City not found.");

    }

}
