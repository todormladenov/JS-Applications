function solve() {
    let infoElement = document.querySelector('.info');
    let departBtnElement = document.getElementById('depart');
    let arriveBtnElement = document.getElementById('arrive');

    let stop = {
        name: '',
        next: 'depot'
    }

    function depart() {
        fetch('http://localhost:3030/jsonstore/bus/schedule/' + stop.next)
        .then(response =>   response.json())
        .then(schedule => {
            stop.name = schedule.name;
            stop.next = schedule.next;
            infoElement.textContent = `Next Stop ${stop.name}`;
        })
        arriveBtnElement.disabled = false;
        departBtnElement.disabled = true;
    }

    function arrive() {
        infoElement.textContent = `Arriving at ${stop.name}`;
        departBtnElement.disabled = false;
        arriveBtnElement.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();