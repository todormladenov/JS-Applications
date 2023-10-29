function attachEvents() {
    let locationElement = document.getElementById('location');
    let forecastElement = document.getElementById('forecast');
    let currentForecastElement = document.getElementById('current');
    let upcomingForecastElement = document.getElementById('upcoming');
    let submitBtnElement = document.getElementById('submit');
    let currentForecastLabelElement = document.querySelector('.label')

    let weatherSymbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176'
    }

    function showError(message, element){
        element.textContent = message;
    }

    function clearFields(parentNode){
        while(parentNode.children.length > 1){
            parentNode.removeChild(parentNode.lastChild)
        }
    }

    async function getLocations() {
        let locationsUrl = `http://localhost:3030/jsonstore/forecaster/locations`;
        try {
            let response = await fetch(locationsUrl);
            let locations = await response.json();

            return locations
        }
        catch (err) {
            forecastElement.style.display = 'block';
            showError(err.message, currentForecastLabelElement);
        }

    }

    submitBtnElement.addEventListener('click', async () => {
        if (locationElement.value == '') {
            return
        }
        
        clearFields(currentForecastElement);
        clearFields(upcomingForecastElement);

        forecastElement.style.display = 'block';
        let locations = await getLocations();
        let foundLocation = locations.find(l => l.name === locationElement.value);

        if (!foundLocation) {
            showError('Location Not Found', currentForecastLabelElement);
            return;
        }
        
        currentForecastLabelElement.textContent = 'Current conditions';
        let code = foundLocation.code;
        getCurrentForecast(code);

        let threeDayForecast = await getUpcomingForecast(code);

        let upcomingForecast = elementCreator('div', null, 'forecast-info', upcomingForecastElement);

        threeDayForecast.forecast.forEach(element => {
            let { condition, high, low } = element;
            let upcomingDegrees = `${low}${weatherSymbols.Degrees}/${high}${weatherSymbols.Degrees}`;

            let upcomingConditionElement = elementCreator('span', null, 'upcoming', upcomingForecast);

            elementCreator('span', weatherSymbols[condition], 'symbol', upcomingConditionElement);
            elementCreator('span', upcomingDegrees, 'forecast-data', upcomingConditionElement);
            elementCreator('span', condition, 'forecast-data', upcomingConditionElement);
        });
    });

    async function getCurrentForecast(code) {
            let url = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
            let response = await fetch(url);
            let todayWeather = await response.json();

            let forecast = todayWeather.forecast;
            let degrees = `${forecast.low}${weatherSymbols.Degrees}/${forecast.high}${weatherSymbols.Degrees}`;

            let newForecast = elementCreator('div', null, 'forecast', currentForecastElement);
            elementCreator('span', weatherSymbols[forecast.condition], 'condition symbol', newForecast);
            let conditionElement = elementCreator('span', null, 'condition', newForecast);
            elementCreator('span', todayWeather.name, 'forecast-data', conditionElement);
            elementCreator('span', degrees, 'forecast-data', conditionElement);
            elementCreator('span', forecast.condition, 'forecast-data', conditionElement);
    }

    async function getUpcomingForecast(code) {
        let url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
        
        let response = await fetch(url);
        let threeDaysWeather = await response.json();

        return threeDaysWeather;
    }

    function elementCreator(type, text, classStyle, parent) {
        let el = document.createElement(type);

        if (text) {
            el.innerHTML = text;
        }

        if (classStyle) {
            el.setAttribute('class', classStyle);
        }

        if (parent) {
            parent.appendChild(el);
        }

        return el;
    }
}
attachEvents();