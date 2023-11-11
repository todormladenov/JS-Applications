import { getAllIdeas } from "./requests.js";

const catalogPage = document.querySelector('#dashboard-holder');

export async function showCatalog(context) {
    catalogPage.innerHTML = '';
    const ideas = await getAllIdeas();

    if (ideas.length) {
        ideas.forEach(ideaData => generateIdeas(ideaData, context));
    } else {
        catalogPage.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>';
    }

    context.showSection(catalogPage);
}

async function generateIdeas(ideaData, context) {
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
    <div class="card-body">
        <p class="card-text">${ideaData.title}</p>
    </div>
    <img class="card-image" src="${ideaData.img}" alt="Card image cap">
    <a class="btn" href="/details">Details</a>
    </div>`;
    catalogPage.appendChild(div);

    div.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.tagName == 'A') {
            const url = new URL(e.target.href);
            const pathname = url.pathname;
            context.goTo(pathname, ideaData._id);
        }
    })
    return div;
}

