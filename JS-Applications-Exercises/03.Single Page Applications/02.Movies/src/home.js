import { getAllMovies } from "./api.js";
import { authenticator } from "./auth.js";

const containerElement = document.getElementById('container');
const homeSectionElement = document.getElementById('home-page');

export function showHome(){
    authenticator();
    containerElement.appendChild(homeSectionElement);
}
