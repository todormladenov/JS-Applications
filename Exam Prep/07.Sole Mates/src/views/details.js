import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getById, removeShoe } from "../services/shoesService.js";

const detailsTemplate = (shoe, removeItem) => html`
<section id="details">
<div id="details-wrapper">
  <p id="details-title">Shoe Details</p>
  <div id="img-wrapper">
    <img src=${shoe.imageUrl} />
  </div>
  <div id="info-wrapper">
    <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
    <p>Model: <span id="details-model">${shoe.model}</span></p>
    <p>Release date: <span id="details-release">${shoe.release}</span></p>
    <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
    <p>Value: <span id="details-value">${shoe.value}</span></p>
  </div>
    ${shoe.isOwner ? html`
    <div id="action-buttons">
        <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
        <a href="javascript:void(0)" id="delete-btn" @click=${removeItem}>Delete</a>
    </div>`
        : nothing}
</div>
</section>`;

export async function detailsView(ctx) {
    const shoeId = ctx.params.id;
    const shoe = await getById(shoeId);
    if (ctx.user) {
        shoe.isOwner = ctx.user._id == shoe._ownerId;
    }
    ctx.render(detailsTemplate(shoe, removeItem));

    async function removeItem(){
        if (confirm(`Are you sure you want to delete ${shoe.brand}?`)) {
            await removeShoe(shoeId);
            ctx.page.redirect('/catalog');
        }
    }
}