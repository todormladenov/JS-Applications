import { addMovieRequest } from "./api.js";
import { authenticator } from "./auth.js";
import { showHome } from "./home.js";

const containerElement = document.getElementById('container');
const createMovieElement = document.getElementById('add-movie');
const addMovieFormElement = document.getElementById('add-movie-form');
addMovieFormElement.addEventListener('submit', addMovie);

export function showCreate() {
    authenticator();
    containerElement.appendChild(createMovieElement);
}

async function addMovie(e) {
    e.preventDefault();

    let formData = new FormData(addMovieFormElement);

    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('img');

    if (title == '' || description == '' || img == '') {
        alert('Missing fields.');
        return;
    }

    let movieData = {
        title,
        description,
        img
    }

    let newMovie = await addMovieRequest(movieData);

    if (newMovie) {
        addMovieFormElement.reset();
        showHome();
    }
}