

// let histBtn = document.getElementsByClassName('histBtn');




function fetchWeather () {
    let location = document.getElementById('searchInput').value;
    let currentImage = document.getElementById('currentImage');
    let searchHist = document.getElementById('searchHist');
    let imageSource = "https://openweathermap.org/img/wn/";
    console.log(location)
    let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + ',US&units=imperial&appid=88d613e9a00e76b75b238a72808a570d'
    fetch(weatherUrl)          
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        document.getElementById('currentCity').innerHTML = location;
        currentImage.innerHTML = imageSource + (data.weather[0].icon + ".png")
        document.getElementById('currentTemp').innerHTML = "Current Temp: " + Number(data.main.temp) + "°"
        document.getElementById('currentWind').innerHTML = "Wind Speed: " + Number(data.wind.speed) + " MPH"
        document.getElementById('currentHumidity').innerHTML = "Humidity: " + Number(data.main.humidity) + " %"
        document.getElementById('currentUvIndex').innerHTML = "UV Index: " + Number(data.clouds.all)

        for (let i=0; i<6; i++) {
            let histBtn = $("<button></button>");
    
            if (i<6) {
                $("div.searchHist").append(histBtn);
                $(histBtn).addClass("histBtn");
                i++;
            }
        }
        document.getElementsByClassName('histBtn').innerHTML = location;
        

    })
}

function fetchForecast () {
    let location = document.getElementById('searchInput').value;
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
            document.getElementById("imageDay" + (i+1)).innerHTML = "https://openweathermap.org/img/wn/" + (data.list[i*8].weather[0].icon + ".png")
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