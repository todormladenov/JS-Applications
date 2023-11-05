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
    addFormElement.addEventListener('submit', addCatch);

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
        try {
            let response = await fetch(catchURL);
            if (response.status != 200) {
                let error = await response.json();
                throw new Error(`${error.message}`);
            }

            let catches = await response.json();
            catchesElement.innerHTML = '';

            catches.forEach(element => {
                const catchElement = generateCatch(element);
                catchesElement.appendChild(catchElement);
            });
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    async function addCatch(e) {
        e.preventDefault();
        let formData = getFormData();
        try {
            let response = await fetch(catchURL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'x-authorization': userInfo.accessToken
                },
                body: JSON.stringify(formData)
            })
            if (response.status != 200) {
                let error = await response.json();
                throw new Error(`${error.message}`);
            }

            let data = await response.json();
            let newCatchElement = generateCatch(data);
            catchesElement.appendChild(newCatchElement);
            addFormElement.reset();
        } catch (error) {
            alert(`Error: ${error.message}`)
        }

    }

    function getFormData() {
        let formData = new FormData(addFormElement);

        let angler = formData.get('angler');
        let weight = formData.get('weight');
        let species = formData.get('species');
        let location = formData.get('location');
        let bait = formData.get('bait');
        let captureTime = formData.get('captureTime');

        if (angler == '' || weight == '' || species == '' || location == '' || bait == '' || captureTime == '') {
            return
        }

        return {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        }
    }

    function generateCatch(element) {
        const div = document.createElement('div');
        div.setAttribute('class', 'catch');
        div.setAttribute('id', element._ownerId);
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
        <button class="update" data-id="${element._ownerId}" disabled>Update</button>
        <button class="delete" data-id="${element._ownerId}" disabled>Delete</button>`;

        if (div.id == userInfo._id) {
            div.querySelectorAll('button').forEach(btn => btn.disabled = false);
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