function bookLibrary() {
    let baseURL = 'http://localhost:3030/jsonstore/collections/books';

    let tbodyElement = document.querySelector('tbody');
    let formElement = document.querySelector('form');
    let [titleInputElement, authorInputElement] = document.querySelectorAll('form input');
    let formBtnElement = formElement.querySelector('button')
    let loadBtnElement = document.getElementById('loadBooks');

    loadBtnElement.addEventListener('click', getAllBooks);
    formElement.addEventListener('submit', addBook);
    let id = '';

    async function getAllBooks() {
        tbodyElement.innerHTML = '';
        let response = await fetch(baseURL);
        let books = await response.json();

        Object.entries(books).forEach(book => {
            let id = book[0];
            let { author, title } = book[1];
            buildTr(author, title, id);
        });
    }

    async function addBook(e) {
        e.preventDefault()
        let formData = getFormData();

        if (!formData) {
            alert('Fields must be fulfilled');
            return;
        }

        if (formBtnElement.textContent == 'Submit') {
            makePostRequest(formData)
        } else {
            makePutRequest(formData);
        }
    }

    async function makePutRequest(formData){
        let response = await fetch(`${baseURL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData)
        });
        let book = await response.json();

        formElement.querySelector('h3').textContent = 'FORM';
        formBtnElement.textContent = 'Submit';
        clearInputs();
        getAllBooks();
    }

    async function makePostRequest(formData) {
        let response = await fetch(baseURL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData)
        });

        let book = await response.json();

        let { author, title } = book;
        buildTr(author, title);

        clearInputs();
    }

    function edit(e) {
        let targetElement = e.currentTarget.parentNode.parentNode;
        let [titleElement, authorElement] = targetElement.childNodes;

        formElement.querySelector('h3').textContent = 'Edit FORM';
        formBtnElement.textContent = 'Save';
        titleInputElement.value = titleElement.textContent;
        authorInputElement.value = authorElement.textContent;
        id = targetElement.id
    }
    
    async function deleteElement(e){
        let targetElement = e.currentTarget.parentNode.parentNode;
        id = targetElement.id;

        targetElement.remove();
        let response = await fetch(`${baseURL}/${id}`, {
            method: 'DELETE',
        });
    }

    function getFormData() {
        let formData = new FormData(formElement);

        let title = formData.get('title');
        let author = formData.get('author');

        if (title == '' || author == '') {
            return;
        }

        return {
            author,
            title
        }
    }

    function buildTr(author, title, id) {
        let tr = document.createElement('tr');
        tr.setAttribute('id', id)

        let tdTitle = tr.insertCell(0);
        tdTitle.innerText = title;

        let tdAuthor = tr.insertCell(1);
        tdAuthor.innerText = author;

        let tdAction = tr.insertCell(2);

        let editBtnElement = document.createElement('button');
        editBtnElement.textContent = 'Edit';
        editBtnElement.addEventListener('click', edit)

        let deleteBtnElement = document.createElement('button');
        deleteBtnElement.textContent = 'Delete';
        deleteBtnElement.addEventListener('click', deleteElement)

        tdAction.appendChild(editBtnElement);
        tdAction.appendChild(deleteBtnElement);

        tbodyElement.appendChild(tr);

        return tr
    }

    function clearInputs() {
        titleInputElement.value = '';
        authorInputElement.value = '';
    }
}
bookLibrary()