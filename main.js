// DOM:
// Search box:
let searchBox = document.querySelector(".search-box");
let searchButton = document.querySelector(".search-box button");
let searchText = document.querySelector(".search-box input");

let card = document.querySelector(".card-container");
// TOP:
let cardTop = document.querySelector(".card-container .search-box");
let cardTopinput = document.querySelector(".card-container .search-box .textbox input");
let cardTopButton = document.querySelector(".card-container .search-box button");
// Not Found:
let cardNotfound = document.querySelector(".card-container .not-found");
let imgNotfound = document.querySelector(".card-container .not-found img");
let textNotfound = document.querySelector(".card-container .not-found p");
// MID:
let cardMid = document.querySelector(".card-container .mid");
let img = document.querySelector(".card-container .mid img");
let midTemperatureNumber = document.querySelector(".card-container .mid .temperature h1");
let midTemperatureDescription = document.querySelector(".card-container .mid .temperature p");
// BOTTOM:
let cardBottom = document.querySelector(".card-container .bottom");
let bottomHumidity = document.querySelector(".card-container .bottom .humidity");
let bottomWindspeed = document.querySelector(".card-container .bottom .wind-speed");
let bottomHumidityNumber = document.querySelector(".card-container .bottom .humidity .humidity-details .number");
let bottomWindspeedNumber = document.querySelector(".card-container .bottom .windspeed .windspeed-details .number");


searchButton.onclick = function () {
    let APIkey = "89f734d9e69205223faed7de401c6da7";
    let city = searchText.value;
    let APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;
    if (city === "") {
        return null;
    } else {
        cardTopinput.value = city;
        searchBox.style.display = "none";
        cardTopButton.onclick = function () {
            city = cardTopinput.value;
            if (city === "") {
                return null;
            } else {
                APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;
                fetch(APIurl)
                    .then((resolve) => {
                        let json = resolve.json();
                        console.log(json);
                        return json;
                    })
                    .then((json) => {

                        if (json.cod === "404") {
                            textNotfound.innerHTML = "Oops! Invalid Location :/";
                            imgNotfound.src = "/image/404.png";
                            cardMid.style.display = "none";
                            cardBottom.style.display = "none";
                            cardNotfound.style.display = "flex";
                        }
                        else {
                            switch (json.weather[0].main) {
                                case "Clouds":
                                    img.src = "/image/cloud.png";
                                    break;
                                case "Rain":
                                    img.src = "/image/rain.png";
                                    break;
                                case "Snow":
                                    img.src = "/image/snow.png";
                                    break;
                                case "Clear":
                                    img.src = "/image/clear.png";
                                    break;
                                case "Mist":
                                    img.src = "/image/mist.png";
                                    break;
                                default:
                                    img.src = "";
                                    break;
                            }
                            bottomHumidityNumber.innerHTML = `${json.main.humidity}%`;
                            bottomWindspeedNumber.innerHTML = `${json.wind.speed}Km/h`;
                            midTemperatureNumber.innerHTML = `${parseInt(json.main.temp)}<sup>°c</sup>`;
                            midTemperatureDescription.innerHTML = json.weather[0].description;
                            cardNotfound.style.display = "none";
                            cardBottom.style.display = "flex";
                            cardMid.style.display = "flex";
                            return json;
                        }
                    })
            }
        }
        card.style.display = "block";
        fetch(APIurl)
            .then((resolve) => {
                let json = resolve.json();
                return json;
            })
            .then((json) => {

                if (json.cod === "404") {
                    textNotfound.innerHTML = "Oops! Invalid Location :/";
                    imgNotfound.src = "/image/404.png";
                    cardMid.style.display = "none";
                    cardBottom.style.display = "none";
                    cardNotfound.style.display = "flex";
                }
                else {
                    switch (json.weather[0].main) {
                        case "Clouds":
                            img.src = "/image/cloud.png";
                            break;
                        case "Rain":
                            img.src = "/image/rain.png";
                            break;
                        case "Snow":
                            img.src = "/image/snow.png";
                            break;
                        case "Clear":
                            img.src = "/image/clear.png";
                            break;
                        case "Mist":
                            img.src = "/image/mist.png";
                            break;
                        default:
                            img.src = "";
                            break;
                    }
                    bottomHumidityNumber.innerHTML = `${json.main.humidity}%`;
                    bottomWindspeedNumber.innerHTML = `${json.wind.speed}Km/h`;
                    midTemperatureNumber.innerHTML = `${parseInt(json.main.temp)}<sup>°c</sup>`;
                    midTemperatureDescription.innerHTML = json.weather[0].description;
                    cardNotfound.style.display = "none";
                    cardBottom.style.display = "flex";
                    cardMid.style.display = "flex";
                    return json;
                }
            })
    };
}