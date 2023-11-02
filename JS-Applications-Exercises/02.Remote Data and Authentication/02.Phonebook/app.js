function attachEvents() {
    let url = 'http://localhost:3030/jsonstore/phonebook';

    let phonebookElement = document.getElementById('phonebook');
    let loadBtnElement = document.getElementById('btnLoad');
    let createBtnElement = document.getElementById('btnCreate');
    let personElement = document.getElementById('person');
    let phoneElement = document.getElementById('phone');

    createBtnElement.addEventListener('click', addInfo);
    loadBtnElement.addEventListener('click', loadPhoneInfo);

    async function loadPhoneInfo() {
        let response = await fetch(url);
        let phonebook = await response.json();
        phonebookElement.innerHTML = '';

        Object.values(phonebook).forEach(el => {

            let { person, phone, _id } = el;
            let liInfoElement = elementCreator('li', `${person}:${phone}`, phonebookElement);
            let deleteBtnElement = elementCreator('button', 'Delete', liInfoElement);

            deleteBtnElement.addEventListener('click', async () => {
                liInfoElement.remove();

                let deleteUrl = `http://localhost:3030/jsonstore/phonebook/${_id}`;
                let response = await fetch(deleteUrl, {
                    method: 'DELETE',
                });
            });
        });
    }

    async function addInfo() {
        if (personElement.value == '' && phoneElement.value == '') {
            return;
        }

        let info = {
            person: personElement.value,
            phone: phoneElement.value
        }

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(info)
        });
        let data = await response.json();

        personElement.value = '';
        phoneElement.value = '';
    }

    function elementCreator(type, text, parent) {
        let el = document.createElement(type);

        if (text) {
            el.textContent = text
        }

        if (parent) {
            parent.appendChild(el);
        }

        return el
    }


}
attachEvents();