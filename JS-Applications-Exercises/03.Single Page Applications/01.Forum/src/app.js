import { showHome } from "./home.js";

const navBarElement = document.querySelector('nav');

navBarElement.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName == 'A') {
        showHome();
    }    
});