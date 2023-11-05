window.addEventListener('load', () => {
    let userInfo = localStorage.getItem('user');
    userInfo = JSON.parse(userInfo);
    let userURL = 'http://localhost:3030/users';
    let catchURL = 'http://localhost:3030/data/catches';

    let userElement = document.getElementById('user');
    let guestElement = document.getElementById('guest');
    let logoutElement = document.getElementById('logout');
    let welcomeMessageElement = document.querySelector('.email span');
    let catchesElement = document.getElementById('catches');
    let addFormElement = document.getElementById('addForm');
    let loadBtnElement = document.querySelector('.load');
    let addElement = document.querySelector('.add');
    catchesElement.innerHTML = '';

    loadBtnElement.addEventListener('click', loadAllCatches);

    if (userInfo.accessToken) {
        userElement.style.display = 'inline';
        guestElement.style.display = 'none';
        addElement.disabled = false;
        welcomeMessageElement.textContent = userInfo.email;
    } else {
        userElement.style.display = 'none';
        guestElement.style.display = 'inline';
        addElement.disabled = true;
    }

    async function loadAllCatches() {
        let response = await fetch(catchURL);
        let catches = await response.json();

        catches.forEach(element => {
            const catchElement = generateCatch(element);
            catchesElement.appendChild(catchElement);
        });
    }

    function generateCatch(element) {
        const div = document.createElement('div');
        div.setAttribute('class', 'catch');
        div.setAttribute('id', element._id);
        div.innerHTML = `                    
        <label>Angler</label>
        <input type="text" class="angler" value="${element.angler}" disabled>
        <label>Weight</label>
        <input type="text" class="weight" value="${element.weight}" disabled>
        <label>Species</label>
        <input type="text" class="species" value="${element.species}" disabled>
        <label>Location</label>
        <input type="text" class="location" value="${element.location}" disabled>
        <label>Bait</label>
        <input type="text" class="bait" value="${element.bait}" disabled>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${element.captureTime}" disabled>
        <button class="update" data-id="${element._id}" disabled>Update</button>
        <button class="delete" data-id="${element._id}" disabled>Delete</button>`;

        if (div.id == userInfo.accessToken) {
            div.querySelectorAll('button').map(btn => btn.disabled = false);
        }

        return div;
    }

    logoutElement.addEventListener('click', async () => {
        let response = fetch(`${userURL}/logout`, {
            method: 'GET',
            headers: { 'x-authorization': userInfo.accessToken }
        });
        localStorage.clear();
        location.reload();
    })
});