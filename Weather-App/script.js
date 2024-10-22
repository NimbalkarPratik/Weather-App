const apiKey = "8aecb2296479f5413612bd1b6b4c426f";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const weather = document.querySelector(".weather");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if(searchBox.value == '') {
        weather.classList.add("displayNone");
        document.querySelector(".city").innerHTML = "Not Found";
        console.log(" Please enter city name ");
        return;
    }

    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    console.log("response : ",response)

    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        weather.classList.remove("displayNone");

        console.log("data : ",data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if(data.weather[0].main === 'Clouds') {
            weatherIcon.src = "images/clouds.png";
        }
        else if(data.weather[0].main === 'Clear') {
            weatherIcon.src = "images/clear.png";
        }
        else if(data.weather[0].main === 'Rain') {
            weatherIcon.src = "images/rain.png";
        }
        else if(data.weather[0].main === 'Drizzle') {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = "images/mist.png";
        }
        else if (data.weather[0].main === 'Snow') {
            weatherIcon.src = "images/snow.png";
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}   

searchBtn.addEventListener('click', ()=> {
    checkWeather(searchBox.value);
})