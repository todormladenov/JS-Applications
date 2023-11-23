import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllShoes } from "../services/shoesService.js";

const catalogTemplate = (shoes) => html`
<section id="dashboard">
<h2>Collectibles</h2>
${shoes.length
        ? cardWrapper(shoes)
        : html`<h2>There are no items added yet.</h2>`}
</section>`;

const cardWrapper = (shoes) => html`
<ul class="card-wrapper">
${shoes.map(s => shoeTemplate(s))}
</ul>`

const shoeTemplate = (shoe) => html`
<li class="card">
<img src=${shoe.imageUrl} alt="travis" />
    <p><strong>Brand: </strong><span class="brand">${shoe.brand}</span></p>
    <p><strong>Model: </strong><span class="model">${shoe.model}</span></p>
    <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
    <a class="details-btn" href="/details/${shoe._id}">Details</a>
</li>`;

export async function catalogView(ctx) {
    const shoes = await getAllShoes();
    ctx.render(catalogTemplate(shoes));
}