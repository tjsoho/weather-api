var searchAreaEl = document.querySelector("#citySearch");
var cityFormEl = document.querySelector("#city-form");
var weatherDataContainerEl = document.querySelector("#weather-data-container");
var citySearchContainerEl = document.querySelector(".searchHistory");


// form submit event to take the city name from the search box
var formSubmitHandler = function (event) {
    event.preventDefault();

    var citySearch = searchAreaEl.value.trim();

    if (citySearch) {
        getCityWeather(citySearch);
        searchAreaEl.value = "";

        // Store every city name in localStorage keeping the previous city name
        localStorage.setItem("city", citySearch);

        //Retrieve the value of citySearch from localStorage and display it in a new button element indide the search history
        var citySearchHistory = localStorage.getItem("city");
        var citySearchHistoryEl = document.createElement("button");
        citySearchHistoryEl.textContent = citySearchHistory;
        citySearchHistoryEl.classList = "btn btn-primary btn-block";
        document.querySelector(".searchHistory").appendChild(citySearchHistoryEl);

        // event listener for the search history buttons to bring back the weather data
        citySearchHistoryEl.addEventListener("click", function () {
            getCityWeather(citySearchHistory);
        });


        weatherDataContainerEl.style.display = "block"; // show the weather data container when data is added
    } else {
        alert("Please enter a city name");
    }
};

// function to get the weather data
var getCityWeather = function (city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=e59b9cf3bb219f49c87ba0bfb16a59e6`;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            var cityNameEl = document.createElement('h2');
            cityNameEl.textContent = data.name;

            var weatherIcon = document.createElement("img");
            weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

            var tempEl = document.createElement('p');
            tempEl.textContent = `Temperature: ${data.main.temp} °C`;

            var humidityEl = document.createElement('p');
            humidityEl.textContent = `Humidity: ${data.main.humidity}%`;

            var windEl = document.createElement('p');
            windEl.textContent = `Wind Speed: ${data.wind.speed} m/s`;

            weatherDataContainerEl.innerHTML = ''; // clear previous weather data
            weatherDataContainerEl.appendChild(cityNameEl);
            weatherDataContainerEl.appendChild(weatherIcon);
            weatherDataContainerEl.appendChild(tempEl);
            weatherDataContainerEl.appendChild(humidityEl);
            weatherDataContainerEl.appendChild(windEl);
        })
        .catch(function (error) {
            console.error(error);
            alert("Unable to retrieve weather data.");
        });
};

// event listener for the form submit with an if statement to make the weather-data-container visible
cityFormEl.addEventListener("submit", formSubmitHandler);

