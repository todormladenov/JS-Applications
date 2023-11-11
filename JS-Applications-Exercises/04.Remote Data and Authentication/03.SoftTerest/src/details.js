import { deleteIdea, getIdeaById } from "./requests.js";

const detailsPage = document.querySelector('#detailsPage');

export function showDetails(context, ideaId){
    detailsPage.innerHTML = '';
    generateIdeaDetails(context, ideaId)
    context.showSection(detailsPage);
}

async function generateIdeaDetails(context, ideaId){
    let idea = await getIdeaById(ideaId);

    detailsPage.innerHTML = `
    <img class="det-img" src="${idea.img}" />
    <div class="desc">
        <h2 class="display-5">${idea.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${idea.description}</p>
    </div>
    <div class="text-center">
        <a class="btn detb">Delete</a>
    </div>
    `

    detailsPage.querySelector('.btn').addEventListener('click', (e) => {
        e.preventDefault();
        deleteIdea(ideaId);
        context.goTo('/catalog');
    })
}