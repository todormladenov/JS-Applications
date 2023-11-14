import { render, html } from "../node_modules/lit-html/lit-html.js";
import { createDeleteRequest, getFurnitureById } from "./requests.js";
const container = document.querySelector('.container');
const user = JSON.parse(localStorage.getItem('user'));

const detailsTemplate = (itemData, deletePost) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${itemData.img} />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${itemData.make}</span></p>
                <p>Model: <span>${itemData.model}</span></p>
                <p>Year: <span>${itemData.year}</span></p>
                <p>Description: <span>${itemData.description}</span></p>
                <p>Price: <span>${itemData.price}</span></p>
                <p>Material: <span>${itemData.material}</span></p>
                ${user && user._id == itemData._ownerId ? 
                    html`
                    <div>
                        <a href="/edit/${itemData._id}" class="btn btn-info">Edit</a>
                        <a href="/delete" class="btn btn-red" @click=${deletePost}>Delete</a>
                    </div>` :
                    html``}
            </div>
</div>`;

export async function showDetails(ctx){
    let itemData = await getFurnitureById(ctx.params.id)
    render(detailsTemplate(itemData, deletePost), container);

    async function deletePost(e){
        e.preventDefault();
        await createDeleteRequest(ctx.params.id);
        ctx.page.redirect('/');
    }
}