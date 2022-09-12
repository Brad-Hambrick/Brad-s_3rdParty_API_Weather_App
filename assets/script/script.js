// API Weather Forecaster Javascript

var searchHistory = [];
var searchHistoryContainer = document.querySelector("#history");

function fetchWeather () {
    let location = document.getElementById('searchInput').value;
    let currentImage = document.getElementById('currentImage');
    let searchHist = document.getElementById('searchHist');
    let imageSource = "https://openweathermap.org/img/wn/";
    let iconDescription = "Forecast weather conditions";
    console.log(location)
    let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + ',US&units=imperial&appid=88d613e9a00e76b75b238a72808a570d'
    fetch(weatherUrl)          
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        document.getElementById('currentCity').innerHTML = location;
        for (i=0; i<1; i++) {
        var image = "https://openweathermap.org/img/wn/" + (data.weather[0].icon + ".png")
        var weatherIcon = document.createElement("img");
        imageContainer = document.querySelector("#currentImage")
        weatherIcon.setAttribute('src', image);
        weatherIcon.setAttribute('alt', iconDescription);
        imageContainer.append(weatherIcon);
        if (weatherIcon.length == i) {
            weatherIcon.length -1;
        }
        }
        document.getElementById('currentTemp').innerHTML = "Current Temp: " + Number(data.main.temp) + "°"
        document.getElementById('currentWind').innerHTML = "Wind Speed: " + Number(data.wind.speed) + " MPH"
        document.getElementById('currentHumidity').innerHTML = "Humidity: " + Number(data.main.humidity) + " %"
        document.getElementById('currentUvIndex').innerHTML = "UV Index: " + Number(data.clouds.all)

        searchHistory.push(location)
        localStorage.setItem("search-history", JSON.stringify(searchHistory));
        searchHistoryContainer.innerHTML = ""
        for (let i=0; i<5; i++) {
            let btn = document.createElement("button")
            btn.setAttribute("type", "button")
            btn.classList.add('history-btn', 'btn-history');
            btn.setAttribute('data-search', searchHistory[i]);
            btn.textContent = searchHistory[i];
            searchHistoryContainer.append(btn);
            btn.addEventListener = function () {
                location=searchHistory
            }
           
        }
        
        

    })
}

function fetchForecast () {
    let location = document.getElementById('searchInput').value;
    let iconDescription = "Forecast weather conditions"
    console.log(location)
    let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + ",US&units=imperial&appid=88d613e9a00e76b75b238a72808a570d"
    fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        for(i=0;i<5;i++){
            document.getElementById("forecastDate"+(i+1)).innerHTML = (data.list[i*8].dt_txt) 
        }
        for(i=0;i<5;i++){
            var image = "https://openweathermap.org/img/wn/" + (data.list[i*8].weather[0].icon) + ".png"
            var weatherIcon = document.createElement("img");
            imageContainer = document.querySelector("#imageDay" + (i+1))
            weatherIcon.setAttribute('src', image);
            weatherIcon.setAttribute('alt', iconDescription);
            imageContainer.append(weatherIcon);
        }
        
        for(i=0;i<5;i++){
            document.getElementById("tempDay"+(i+1)).innerHTML = "Temp: " + Number(data.list[i*8].main.temp) + "°"
        }
        for(i=0;i<5;i++){
            document.getElementById("windDay"+(i+1)).innerHTML = "Wind Speed: " + Number(data.list[i*8].wind.speed) + " MPH"
        }
        for(i=0;i<5;i++){
            document.getElementById("humidityDay"+(i+1)).innerHTML = "Humidity: " + Number(data.list[i*8].main.temp) + " %"
        }
        
    })
}


let searchBtn = document.getElementById("searchBtn");
searchBtn.onclick = function(){
    fetchWeather()
    fetchForecast()
};