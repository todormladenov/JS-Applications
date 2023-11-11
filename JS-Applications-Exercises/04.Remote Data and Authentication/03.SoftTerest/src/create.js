import { sendIdeaRequest } from "./requests.js";

const createPage = document.querySelector('#createPage');
const createForm = createPage.querySelector('.form-idea');
createForm.addEventListener('submit', addIdea);
let ctx = null;

export function showCreate(context){
    ctx = context;
    context.showSection(createPage);
}

async function addIdea(e){
    e.preventDefault();

    let formData = new FormData(createForm);

    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageURL');

    sendIdeaRequest({title, description, img});
    ctx.goTo('/catalog');
    createForm.reset();
}


