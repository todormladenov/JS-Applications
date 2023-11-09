import { getAllMovies } from "./api.js";
import { authenticator } from "./auth.js";
import { showDetails } from "./details.js";

const containerElement = document.getElementById('container');
const homeSectionElement = document.getElementById('home-page');
const movieListElement = document.getElementById('movies-list');

export function showHome() {
    authenticator();
    containerElement.appendChild(homeSectionElement);
    generateAllMovies();
}

async function generateAllMovies() {
    movieListElement.innerHTML = '';
    let allMovies = await getAllMovies();
    allMovies.forEach(movieData => createMoviePreview(movieData));
}

function createMoviePreview(movieData) {
    let element = document.createElement('div');
    element.className = 'card mb-4';

    element.innerHTML = `
    <img class="card-img-top" src=${movieData.img} 
        alt="Card image cap" width="400">
    <div class="card-body">
            <h4>${movieData.title}</h4>
    </div>
    <div class="card-footer">
            <a data-id=${movieData._id} href="/details/${movieData._id}">
            <button type="button" class="btn btn-info">Details</button>
            </a>    
    </div>`;

        element.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let id = e.currentTarget.dataset.id
        showDetails(id);
    });

    movieListElement.appendChild(element);
    return element;
}