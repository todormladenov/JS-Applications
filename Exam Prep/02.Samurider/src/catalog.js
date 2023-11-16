import { render, html } from "../node_modules/lit-html/lit-html.js";
import { getAllItems } from "./requests.js";

const root = document.getElementById('root');

const catalogTemplate = (itemsData) => html`
<h2>Available Motorcycles</h2>
<section id="dashboard">
${itemsData.length ? itemsData.map(item => html`${itemTemplate(item)}`) : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
</section>`;

const itemTemplate = (itemData) => html`
<div class="motorcycle">
<img src="${itemData.imageUrl}" alt="example1" />
<h3 class="model">${itemData.model}</h3>
<p class="year">Year: ${itemData.year}</p>
<p class="mileage">Mileage: ${itemData.mileage} km.</p>
<p class="contact">Contact Number: ${itemData.contact}</p>
<a class="details-btn" href="/details/${itemData._id}">More Info</a>
</div>`;

export async function viewCatalog(ctx) {
  ctx.updateNavBar();
  const itemsData = await getAllItems();
  render(catalogTemplate(itemsData), root);
}