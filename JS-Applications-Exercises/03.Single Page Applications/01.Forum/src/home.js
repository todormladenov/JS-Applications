import { generateTopicElement } from "./generateDom.js";
import { getAllPosts, sendPost } from "./requests.js";
import { showDetails } from "./showDetails.js";

const mainElement = document.querySelector('main');
const homeSectionElement = document.querySelector('.home');
const topicContentElement = document.querySelector('.topic-title');
const formElement = homeSectionElement.querySelector('form');
const cancelBtnElement = formElement.querySelector('.cancel');

topicContentElement.addEventListener('click', (e) => {
    e.preventDefault();
    showDetails();
});

formElement.addEventListener('submit', addPost);
cancelBtnElement.addEventListener('click', cancelPost);

export async function showHome() {
    mainElement.replaceChildren(homeSectionElement);
    let allPosts = await getAllPosts();
    topicContentElement.innerHTML = '';
    allPosts.forEach(post => {
        generateTopicElement(post);
    });
}

function cancelPost(e){
    e.preventDefault();
    formElement.reset();
}

async function addPost(e) {
    e.preventDefault();
    let formData = new FormData(formElement);

    let topicName = formData.get('topicName');
    let username = formData.get('username');
    let postText = formData.get('postText');
    let date = new Date().getTime();

    let topicData = await sendPost({ topicName, username, postText, date })

    generateTopicElement(topicData);
    formElement.reset();
    showHome();
}