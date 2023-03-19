var searchAreaEl = document.querySelector("#citySearch");
var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=$85c75899f58ea410286679d581b73dd2`;



// form submit event to take the city name from the search box
var formSubmitHandler = function (event) {
    event.preventDefault();

    var citySearch = searchAreaEl.value.trim();

    if (citySearch) {
        getCityWeather(citySearch);
        searchAreaEl.value = "";
    } else {
        alert("Please enter a city name");
    }
};

var getCityWeather = function (city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=$' + city + '&units=metric&appid=$85c75899f58ea410286679d581b73dd2`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data, city);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        }
        )
};