import { auth } from "./authentication.js";

const createSectionElement = document.querySelector('.create');
const createFormElement = createSectionElement.querySelector('form');
createFormElement.addEventListener('submit', addRecipe);

export function renderCreate() {
    createSectionElement.style.display = 'block';
}

async function addRecipe(e) {
    e.preventDefault();

    let formData = new FormData(createFormElement);

    let name = formData.get('name');
    let img = formData.get('img');
    let ingredients = formData.get('ingredients').split('\n');
    let steps = formData.get('steps').split('\n');
    let accessToken = localStorage.getItem('accessToken');

    try {
        let response = await fetch('http://localhost:3030/data/recipes', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-Authorization': accessToken
            },
            body: JSON.stringify({ name, img, ingredients, steps })
        });
        if (response.status != 200) {
            let error = await response.json();
            throw new Error(error.message);
        }

        alert('Recipe successfully added.');
        createFormElement.reset();
        auth();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}