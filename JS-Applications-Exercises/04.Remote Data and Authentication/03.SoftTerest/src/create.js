import { sendIdeaRequest } from "./requests.js";

const createPage = document.querySelector('#createPage');
const createForm = createPage.querySelector('.form-idea');

export function showCreate(context){
    context.showSection(createPage);
    createForm.addEventListener('submit', addIdea);

    async function addIdea(e){
        e.preventDefault();
    
        let formData = new FormData(createForm);
    
        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('imageURL');
    
        sendIdeaRequest({title, description, img});
        createForm.reset();
        context.goTo('/catalog');
    }
}



