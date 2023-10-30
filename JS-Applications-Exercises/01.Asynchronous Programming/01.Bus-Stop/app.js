function getInfo() {
    let baseUrl = `http://localhost:3030/jsonstore/bus/businfo/`;
    let stopIdElement = document.getElementById('stopId');
    let stopNameElement = document.getElementById('stopName');
    let busesElement = document.getElementById('buses');

    fetch(baseUrl + stopIdElement.value)
        .then(response => {
            busesElement.replaceChildren();
            stopIdElement.value = '';
            return response.json();
        })
        .then(busesInfo => {
            stopNameElement.textContent = busesInfo.name;

            Object.entries(busesInfo.buses).forEach(stopInfo => {
                let liElement = document.createElement('li');

                liElement.textContent = `Bus ${stopInfo[0]} arrives in ${stopInfo[1]} minute`;
                busesElement.appendChild(liElement);
            })
        })
        .catch(err => {
            stopNameElement.textContent = 'Error';
        })

}