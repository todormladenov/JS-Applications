import { deleteMovieRequest, getMovieById } from "./api.js";
import { authenticator } from "./auth.js";

const containerElement = document.getElementById('container');
const detailsElement = document.getElementById('movie-example');
const movieDescriptionElement = document.querySelector('.col-md-4');

export function showDetails(id) {
    authenticator();
    detailsElement.innerHTML = '';
    generateDetailsElement(id);
    containerElement.appendChild(detailsElement);
    
}

async function generateDetailsElement(id){
    let movieData = await getMovieById(id);
    let el = document.createElement('div');
    el.classList.add('container');

    el.innerHTML = `
        <div class="row bg-light text-dark">
          <h1>Movie title: ${movieData.title}</h1>

          <div class="col-md-8">
            <img class="img-thumbnail" src="${movieData.img}"
              alt="Movie" />
          </div>
          <div class="col-md-4 text-center">
            <h3 class="my-3">Movie Description</h3>
            <p>${movieData.description}</p>
            <a class="btn btn-danger" href="/delete" data-id="${movieData._ownerId}">Delete</a>
            <a class="btn btn-warning" href="/edit" data-id="${movieData._ownerId}">Edit</a>
            <a class="btn btn-primary" href="/like" data-id="${movieData._ownerId}">Like</a>
            <span class="enrolled-span">Liked 1</span>
          </div>
        </div>`
        detailsElement.appendChild(el);
}

