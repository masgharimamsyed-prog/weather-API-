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
    if (event.type == 'click' || event.key == "Enter") {
        if (searchInput.value != "") {
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
            }
            searchInput.value = "";
        }
    }


}

