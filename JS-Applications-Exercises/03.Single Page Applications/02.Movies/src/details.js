import { authenticator } from "./auth.js";

const containerElement = document.getElementById('container');
const detailsElement = document.getElementById('movie-example');

export function showDetails() {
    authenticator();
    containerElement.appendChild(detailsElement);
}