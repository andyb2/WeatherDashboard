document.querySelector('#searchButton').addEventListener('click', function () {
    var search = document.querySelector('#searchBar').value
    console.log(search)
    getSearchInfo(search);
})

var cityArray = JSON.parse(localStorage.getItem('weatherList')) || []

// API fetching and showing data
async function getSearchInfo(search) {

    // document.querySelector('.header').classList.remove('d-none')
    let timeAndDay = moment().format('MMMM Do YYYY, h:mm:ss a');
    let weatherInsert = document.querySelector('#weatherInfo');
    let fiveDayWeather = document.querySelector('#fiveForecast');

    // Fetching five day forecast
    fiveDay = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=4859272ebb346a7ffe3fc36be25d8376`).then(r => r.json())
    console.log(fiveDay)
    // Fetching today's weather forecast
    weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4859272ebb346a7ffe3fc36be25d8376`).then(r => r.json())
    console.log(weatherData)
    // Fetching UV index
    uvIndex = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&exclude={part}&appid=4859272ebb346a7ffe3fc36be25d8376`).then(r => r.json())
    console.log(uvIndex)
    
    //Card showing current weather for searched location
    weatherInsert.innerHTML =
      ` <div class="header"> Today's Weather:</div>
        <div class="card" id="todayWeather" style="width: 500px; height: 500px;">
            <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" style="width: 100px" class="card-img-top" alt="Weather Icon">
            <div class="card-body">
                <h2 class="cityName">${weatherData.name}</h2>
                <h5>${timeAndDay}</h5>
                    <p>Temperature: ${(weatherData.main.temp - 273.15).toFixed(1)}°C</p>
                    <p>Feels like: ${(weatherData.main.feels_like - 273.15).toFixed(1)}</p>
                    <p>Wind Speed: ${(weatherData.wind.speed * 1.60934).toFixed(1)} KPH</p>
                    <p>UV index: ${uvIndex.current.uvi}</p>
                </p>
            </div>
        </div>`
    
    //Cards showing the 5 day forecast
    fiveDayWeather.innerHTML = `
        <div class="header"> 5-Day Forecast:</div>
        <div class="card my-1" id="fiveCard" style = "width: 18rem;">
            <img src="http://openweathermap.org/img/wn/${fiveDay.list[0].weather[0].icon}@2x.png" style="width: 100px" class="card-img-top" alt="">
            <div class="card-body-five">
                <p>${new Date(fiveDay.list[0].dt * 1000).toDateString()}</p>
                <p>Temp: ${(fiveDay.list[0].main.temp - 273.15).toFixed(1)}°C</p>
                <p>Humidity: ${fiveDay.list[0].main.humidity}%</p>
            </div>
        </div>
    
    
        <div class="card my-1" id="fiveCard" style = "width: 18rem;">
            <img src="http://openweathermap.org/img/wn/${fiveDay.list[8].weather[0].icon}@2x.png" style="width: 100px" class="card-img-top" alt="">
            <div class="card-body-five">
                <p>${new Date(fiveDay.list[8].dt * 1000).toDateString()}</p>
                <p>Temp: ${(fiveDay.list[8].main.temp - 273.15).toFixed(1)}°C</p>
                <p>Humidity: ${fiveDay.list[8].main.humidity}%</p>
            </div>
        </div>
    
    
        <div class="card my-1" id="fiveCard" style = "width: 18rem;">
            <img src="http://openweathermap.org/img/wn/${fiveDay.list[16].weather[0].icon}@2x.png" style="width: 100px" class="card-img-top" alt="">
            <div class="card-body-five">
                <p>${new Date(fiveDay.list[16].dt * 1000).toDateString()}</p>
                <p>Temp: ${(fiveDay.list[16].main.temp - 273.15).toFixed(1)}°C</p>
                <p>Humidity: ${fiveDay.list[16].main.humidity}%</p>
            </div>
        </div>
  
        <div class="card my-1" id="fiveCard" style = "width: 18rem;">
            <img src="http://openweathermap.org/img/wn/${fiveDay.list[24].weather[0].icon}@2x.png" style="width: 100px" class="card-img-top" alt="">
            <div class="card-body-five">
                <p>${new Date(fiveDay.list[24].dt * 1000).toDateString()}</p>
                <p>Temp: ${(fiveDay.list[24].main.temp - 273.15).toFixed(1)}°C</p>
                <p>Humidity: ${fiveDay.list[24].main.humidity}%</p>
            </div>
        </div>
        <div class="card my-1" id="fiveCard" style = "width: 18rem;">
            <img src="http://openweathermap.org/img/wn/${fiveDay.list[32].weather[0].icon}@2x.png" style="width: 100px" class="card-img-top" alt="">
            <div class="card-body-five">
                <p>${new Date(fiveDay.list[32].dt * 1000).toDateString()}</p>
                <p>Temp: ${(fiveDay.list[32].main.temp - 273.15).toFixed(1)}°C</p>
                <p>Humidity: ${fiveDay.list[32].main.humidity}%</p>
            </div>
        </div>`

    // Only pushes results to array if the search result hasn't been searched for
    if (cityArray.indexOf(search) === -1) {
        cityArray.push(search)
        addToList(search);
    }

    localStorage.setItem('weatherList', JSON.stringify(cityArray));
}

getParse();
// Repopulates the saved searches when reloaded
function getParse() {
    var jParse = JSON.parse(localStorage.getItem('weatherList')) || [];

    for (let i = 0; i < jParse.length; i++) {
        document.querySelector('#cityList').innerHTML += `<li class="list-group-item"><button class="cityButton">${jParse[i]}</button></li>`
    }
}

document.querySelector('#cityList').addEventListener('click', function (event) {
    getSearchInfo(event.target.textContent);
})

function addToList(search) {
    document.querySelector('#cityList').innerHTML += `<li class="list-group-item"><button class="cityButton">${search}</button></li>`
}