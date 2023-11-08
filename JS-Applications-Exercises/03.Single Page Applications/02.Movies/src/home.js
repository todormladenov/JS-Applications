const containerElement = document.getElementById('container');
const homeSectionElement = document.getElementById('home-page');

export function showHome(){
    containerElement.appendChild(homeSectionElement);
}