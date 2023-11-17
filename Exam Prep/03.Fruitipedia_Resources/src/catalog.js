import { html } from "../node_modules/lit-html/lit-html.js";
import { getAllItems } from "./requests.js";

const catalogTemplate = (fruitsData) => html`
<h2>Fruits</h2>
      <section id="dashboard">
        ${fruitsData.length ? fruitsData.map(fruit => html`${fruitTemplate(fruit)}`) : html`<h2>No fruit info yet.</h2>`}      
      </section>`;

const fruitTemplate = (fruitData) => html`
<div class="fruit">
<img src="${fruitData.imageUrl}" alt="example1" />
<h3 class="title">${fruitData.name}</h3>
<p class="description">${fruitData.description}</p>
<a class="details-btn" href="/details/${fruitData._id}">More Info</a>
</div>`;

export async function viewCatalog(ctx) {
  const fruitsData = await getAllItems()
  ctx.render(catalogTemplate(fruitsData));
}