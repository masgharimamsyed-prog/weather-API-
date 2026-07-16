/* search bar */
let searchInput = document.querySelector('.search-input');
let searchIcon = document.querySelector('.search-icon i');

/*starting screen */
let startingScreen = document.querySelector('.starting-screen');

/* running screen */
let runningScreen = document.querySelector('.running-screen');
let locationName = document.querySelector('.location-name');
let date = document.querySelector('.date-text');
let mainImage = document.querySelector('.main-image');
let tempNo = document.querySelector('.temp-no');
let tempName = document.querySelector('.temp-name');
let humidity = document.querySelector('.humidity-no');
let speed = document.querySelector('.speed-no');


/* not found screen */
let notFoundScreen = document.querySelector('.not-found-screen');

/* variable */
let screenStart = false;


/* starting screen event listener*/
runningScreen.classList.add('noDisplay');
notFoundScreen.classList.add('noDisplay');

searchIcon.addEventListener('click', clickfunction);
searchInput.addEventListener('keydown', clickfunction);


/* functions for event listener */
async function clickfunction() {
    if ((event.type == 'click' || event.key == "Enter") && (searchInput.value != "")) {
        if (!screenStart) {
            startingScreen.classList.add('noDisplay');
            screenStart = true;
        }
        let result;
        try {
            let data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=c8d016794fe74b5af611d5bc42748eaf&units=metric`);
            result = await data.json();
        }
        catch (err) {
            console.log("error is happening while fetching data form API:", err);
        }

        if (result.cod == 404) {
            notFoundScreen.classList.remove('noDisplay');
            runningScreen.classList.add('noDisplay');
        }
        else if (result.cod == 200) {
            notFoundScreen.classList.add('noDisplay');
            runningScreen.classList.remove('noDisplay');
            console.log(result);
            /* Present temp */
            locationName.innerText = result.city.name;
            date.innerText = result.list["0"].dt_txt;
            tempNo.innerText = result.list["0"].main.temp + '°C';
            tempName.innerText = result.list['0'].weather["0"].main;
            humidity.innerText = result.list['0'].main.humidity;
            speed.innerText = result.list['0'].wind.speed;

            let weatherID = result.list['0'].weather['0'].id;
            if (weatherID >= 200 && weatherID <= 232) {
                mainImage.src = 'thunderstorm.svg'
            }
            else if (weatherID >= 300 && weatherID <= 321) {
                mainImage.src = 'drizzle.svg'
            }
            else if (weatherID >= 500 && weatherID <= 531) {
                mainImage.src = 'rain.svg'
            }
            else if (weatherID >= 600 && weatherID <= 622) {
                mainImage.src = 'snow.svg'
            }
            else if (weatherID >= 801 && weatherID <= 804) {
                mainImage.src = 'clouds.svg'
            }
            else {
                mainImage.src = 'clear.svg'
            }

            /* forecase in cards */

            for (let i = 1; i <= 10; i++) {
                console.log(i);
                let headingDate = document.querySelector(`.card${i} h6`);
                let cardImg = document.querySelector(`.card${i} img`);
                let headingTemp = document.querySelector(`.card${i} h5`);

                headingDate.innerText = result.list[`${i}`].dt_txt;
                headingTemp.innerText = result.list[`${i}`].main.temp + '°C';

                let weatherID = result.list[`${i}`].weather['0'].id;
                if (weatherID >= 200 && weatherID <= 232) {
                    cardImg.src = 'thunderstorm.svg'
                }
                else if (weatherID >= 300 && weatherID <= 321) {
                    cardImg.src = 'drizzle.svg'
                }
                else if (weatherID >= 500 && weatherID <= 531) {
                    cardImg.src = 'rain.svg'
                }
                else if (weatherID >= 600 && weatherID <= 622) {
                    cardImg.src = 'snow.svg'
                }
                else if (weatherID >= 801 && weatherID <= 804) {
                    cardImg.src = 'clouds.svg'
                }
                else {
                    cardImg.src = 'clear.svg'
                }
            }
        }
        searchInput.value = "";

    }


}

