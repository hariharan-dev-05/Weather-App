const btn = document.getElementById('submit-btn');
const des = document.getElementById('description');
const humidity = document.getElementById('humidity');
const weatherImg = document.getElementById('weather-img');
const temp = document.getElementById('temp');
const windSpeed = document.getElementById('wind-speed');
const errMsg = document.getElementById('err-msg');
const year = document.getElementById('year');

const apiKey = "f62d2a5e9418108a091145d0055a8290";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

var date = new Date();

year.textContent = `${date.getFullYear()} `;

// Event listener for button click
btn.addEventListener('click', () => {
    const location = document.getElementById('search-field').value;
    fetchWeather(location);
});

// Event listener for Enter key press
document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const location = document.getElementById('search-field').value;
        fetchWeather(location);
    }
});

async function fetchWeather(loc) {
    try {
        const url = `${apiUrl}?q=${loc}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        if (response.status === 404) {
            errMsg.textContent = "City Not Found";
            clearWeatherInfo();
            return;
        }
        if (!response.ok) {
            errMsg.textContent = "An error occurred";
            clearWeatherInfo();
            return;
        }
        const result = await response.json();
        weatherImg.src = `./Asserts/${result.weather[0].icon}.svg`;
        des.textContent = `${result.weather[0].description}`;
        humidity.textContent = `Humidity: ${result.main.humidity}%`;
        temp.textContent = `${result.main.temp}°C`;
        windSpeed.textContent = `Wind Speed : ${result.wind.speed} meter/sec`;
        errMsg.textContent = "";
    } catch (err) {
        errMsg.textContent = "Failed to fetch weather data";
        clearWeatherInfo();
    }
}

function clearWeatherInfo() {
    weatherImg.src = '';
    des.textContent = '';
    humidity.textContent = '';
    temp.textContent = '';
    windSpeed.textContent = '';
}