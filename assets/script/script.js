

// let histBtn = document.getElementsByClassName('histBtn');




function fetchWeather () {
    let location = document.getElementById('searchInput').value;
    let currentImage = document.getElementById('currentImage');
    currentImage.src = "http://openweathermap.org/img/wn/";
    console.log(location)
    let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + ',US&units=imperial&appid=88d613e9a00e76b75b238a72808a570d'
    fetch(weatherUrl)          
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        document.getElementById('currentCity').innerHTML = location;
        currentImage.innerHTML = currentImage.src + (data.weather[0].icon + ".png")
        document.getElementById('currentTemp').innerHTML = "Current Temp: " + Number(data.main.temp) + "°"
        document.getElementById('currentWind').innerHTML = "Wind Speed: " + Number(data.wind.speed) + " MPH"
        document.getElementById('currentHumidity').innerHTML = "Humidity: " + Number(data.main.humidity) + " %"
        document.getElementById('currentUvIndex').innerHTML = "UV Index: " + Number(data.clouds.all)
        document.getElementById('searchHist').innerHTML = location
        
       
    })
}

function fetchForecast () {
    let location = document.getElementById('searchInput').value;
    let currentImage = document.getElementById('currentImage');
    currentImage.src = "http://openweathermap.org/img/wn/";
    console.log(location)
}

let searchBtn = document.getElementById("searchBtn");
searchBtn.onclick = function(){
    fetchWeather()
};