import { html, nothing } from "../node_modules/lit-html/lit-html.js";
import { getUser } from "./authService.js";
import { createDeleteRequest, getItemById } from "./requests.js";

const detailsTemplate = (fruitData, isOwner, onDelete) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${fruitData.imageUrl} alt="example1" />
  <p id="details-title">${fruitData.name}</p>
  <div id="info-wrapper">
    <div id="details-description">
      <p>${fruitData.description}</p>
      <p id="nutrition">Nutrition</p>
      <p id="details-nutrition">${fruitData.nutrition}</p>
    </div>
    ${isOwner ? actionBtnsTemplate(fruitData, onDelete) : nothing}
  </div>
</div>
</section>`;

const actionBtnsTemplate = (fruitData, onDelete) => html`
<div id="action-buttons">
    <a href="/edit/${fruitData._id}" id="edit-btn">Edit</a>
    <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
</div>`;

export async function viewDetails(ctx){
    const fruitData = await getItemById(ctx.params.id);
    const user = getUser();
    const isOwner = user && user._id == fruitData._ownerId;
    ctx.render(detailsTemplate(fruitData, isOwner, onDelete));

    async function onDelete(){
      if (confirm('Are you sure you want to delete this post?')) {
        await createDeleteRequest(ctx.params.id);
        ctx.page.redirect('/catalog');
      }
    }
}