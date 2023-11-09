import { editMovieRequest, getMovieById } from "./api.js";
import { authenticator } from "./auth.js";
import { showDetails } from "./details.js";

const containerElement = document.getElementById('container');
const editMovieElement = document.getElementById('edit-movie');
const editFormElement = editMovieElement.querySelector('form');

export function showEditMovie(movieId) {
    authenticator();
    containerElement.appendChild(editMovieElement);
    generateFormData(movieId);
}

async function generateFormData(movieId) {
    let movieData = await getMovieById(movieId);
    
    editFormElement.querySelector('#title').value = movieData.title;
    editFormElement.querySelector('textarea').value = movieData.description;
    editFormElement.querySelector('#imageUrl').value = movieData.img;

    editFormElement.addEventListener('submit', (e) => {
        e.preventDefault();

        let formData = new FormData(editFormElement);
    
        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('img');

        editMovieRequest(movieId, {title, description, img});
        showDetails(movieId);    
    });
}