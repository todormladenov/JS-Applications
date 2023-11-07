import { generateTopicComment, generateTopicDetails, renderFormElement } from "./generateDom.js";
import { getAllCommentsById, getPostById, sendComment } from "./requests.js";

const mainElement = document.querySelector('main');
const detailsElement = document.querySelector('.details-view');
const commentsFormElement = document.querySelector('.answer-comment form');
commentsFormElement.addEventListener('submit', addComment);
let topicId = ''

export async function showDetails(id) {
    renderFormElement();

    topicId = id;
    let post = await getPostById(id);
    
    let comments = await getAllCommentsById();
    generateTopicDetails(post);
    if (comments) {
        comments.forEach(comment => {
            if (comment.topicId == topicId) {
                generateTopicComment(comment);
            }
        });
    }


    mainElement.replaceChildren(detailsElement);

}

async function addComment(e) {
    e.preventDefault();
    const commentsFormElement = document.querySelector('.answer-comment form');
    let formData = new FormData(commentsFormElement);

    let postText = formData.get('postText');
    let username = formData.get('username');
    let date = new Date().getTime();

    commentsFormElement.reset();
    sendComment({ postText, username,  topicId, date});
    showDetails(topicId);
}

