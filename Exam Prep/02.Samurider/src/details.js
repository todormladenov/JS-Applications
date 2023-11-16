import { render, html } from "../node_modules/lit-html/lit-html.js";
import { createDeleteRequest, getItemById } from "./requests.js";

const root = document.getElementById('root');

const detailsTemplate = (itemData, isOwner, onDelete) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${itemData.imageUrl} alt="example1" />
  <p id="details-title">${itemData.model}</p>
  <div id="info-wrapper">
        <div id="details-description">
            <p class="year">Year: ${itemData.year}</p>
            <p class="mileage">Mileage: ${itemData.mileage} km.</p>
            <p class="contact">Contact Number: ${itemData.contact}</p>
            <p id="motorcycle-description">${itemData.about}</p>
        </div>
        ${isOwner ? html`
        <div id="action-buttons">
            <a href="/edit/${itemData._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
        </div>` : null}
  </div>
</div>
</section>`;

export async function viewDetails(ctx) {
    const itemData = await getItemById(ctx.params.id);
    const user = JSON.parse(localStorage.getItem('user'));
    const isOwner = user && user._id == itemData._ownerId;
    render(detailsTemplate(itemData, isOwner, onDelete), root);

    async function onDelete(){
        if (confirm('Are you sur you want to delete this post?')) {
            await createDeleteRequest(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
}