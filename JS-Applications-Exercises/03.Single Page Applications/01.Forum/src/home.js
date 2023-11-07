import { showDetails } from "./showDetails.js";

const mainElement = document.querySelector('main');
const homeSectionElement = document.querySelector('.home');
const topicContentElement = document.querySelector('.topic-title');

topicContentElement.addEventListener('click', (e) => {
    e.preventDefault();
    showDetails();
})

export function showHome() {
    mainElement.replaceChildren(homeSectionElement);
}