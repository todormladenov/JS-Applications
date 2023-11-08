import { showHome } from "./home.js";
import { router } from "./router.js";

const navBarElement = document.querySelector('.navbar');
const addMovieBtnElement = document.getElementById('add-movie-button');
showHome();

navBarElement.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.tagName == 'A') {
        const url = new URL (e.target.href);
        router(url.pathname);
    }
});

addMovieBtnElement.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (e.target.tagName == 'A') {
        const url = new URL (e.target.href);
        router(url.pathname);
    }
});