function attachEvents() {

    let messagesArea = document.getElementById('messages');
    let refreshBtnElement = document.getElementById('refresh');
    let sendBtnElement = document.getElementById('submit');
    let authorInputElement = document.getElementsByName('author')[0];
    let contentInputElement = document.getElementsByName('content')[0];

    refreshBtnElement.addEventListener('click', loadMessages);
    sendBtnElement.addEventListener('click', sendMessage);

    async function loadMessages() {
        let url = 'http://localhost:3030/jsonstore/messenger';

        let response = await fetch(url);
        let messages = await response.json();

        messagesArea.textContent = Object.values(messages)
            .map(({ author, content }) => `${author}: ${content}`)
            .join('\n');
    }

    async function sendMessage() {
        let url = 'http://localhost:3030/jsonstore/messenger';

        if (authorInputElement.value == '' && contentInputElement.value == '') {
            return;
        }

        let message = {
            author: authorInputElement.value,
            content: contentInputElement.value
        }

        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(message)
        });
        let messages = await response.json();

        authorInputElement.value = '';
        contentInputElement.value = '';
    }
}
attachEvents();