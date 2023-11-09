import { deleteMovieRequest, getLikes, getMovieById, likeMovie } from "./api.js";
import { authenticator, getUser } from "./auth.js";
import { showEditMovie } from "./editMovie.js";
import { router } from "./router.js";

const containerElement = document.getElementById('container');
const detailsElement = document.getElementById('movie-example');

const options = {
    '/delete': deleteMovieRequest,
    '/edit': showEditMovie,
    '/like': likeMovie
}

export function showDetails(movieId) {
    authenticator();
    detailsElement.innerHTML = '';
    generateDetailsElement(movieId);
    containerElement.appendChild(detailsElement);;
}

async function generateDetailsElement(movieId) {
    let user = getUser();
    const [movieData, likes, ownLike] = await Promise.all([
        getMovieById(movieId),
        getLikes(movieId),
        getOwnLike(movieId, user)
    ])
    let el = document.createElement('div');
    el.classList.add('container');
    let isOwner = user && user._id == movieData._ownerId;

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
            <a class="btn btn-danger" href="/delete" data-id="${movieData._id}" style="display: ${isOwner ? "inline" : "none"}"}>Delete</a>
            <a class="btn btn-warning" href="/edit" data-id="${movieData._id}" style="display: ${isOwner ? "inline" : "none"}"}>Edit</a>
            <a class="btn btn-primary" href="/like" data-id="${movieData._id}" style="display: ${isOwner || !user || ownLike ? "none" : "inline"}"}>Like</a>
            <span class="enrolled-span">Like ${likes}</span>
          </div>
        </div>`

    el.querySelector('.col-md-4').addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName == 'A') {
            const url = new URL(e.target.href);
            let movieId = e.target.dataset.id;
            let option = options[url.pathname];
            option(movieId);
            if (e.target.textContent == 'Delete') {
                router('/');
            } else if (e.target.textContent == 'Like'){
                showDetails(movieId);
            }
        }
    });

    detailsElement.appendChild(el);
}

async function getOwnLike(movieId, user) {
    if (!user) {
        return false
    } else {
        let userId = user._id
        let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        let like = await response.json();

        return like.length > 0
    }

}