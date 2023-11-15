import { render, html } from "../node_modules/lit-html/lit-html.js";
import { createDeleteRequest, getFurnitureById } from "./requests.js";
const container = document.querySelector('.container');

const detailsTemplate = (itemData, isOwner, deletePost) => html`
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
                ${isOwner ?
                    html`
                    <div>
                        <a href="/edit/${itemData._id}" class="btn btn-info">Edit</a>
                        <a href="javascript:void(0)" class="btn btn-red" @click=${deletePost}>Delete</a>
                    </div>` : null}
            </div>
</div>`;

export async function showDetails(ctx) {
    let itemData = await getFurnitureById(ctx.params.id)
    const user = JSON.parse(localStorage.getItem('user'));
    const isOwner = user && user._id == itemData._ownerId;
    
    render(detailsTemplate(itemData, isOwner, deletePost), container);
    
    async function deletePost() {
        await createDeleteRequest(ctx.params.id);
        ctx.page.redirect('/');
    }
}