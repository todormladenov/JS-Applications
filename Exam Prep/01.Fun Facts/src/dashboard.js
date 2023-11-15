import { render, html } from "../node_modules/lit-html/lit-html.js";
import { getAllFacts } from "./requests.js";

const root = document.querySelector('main');

const dashboardTemplate = (factsData) => html`
<h2>Fun Facts</h2>
<section id="dashboard">
${factsData.length ? factsData.map(fact => html`${factTemplate(fact)}`) : html`<h2>No Fun Facts yet.</h2>`}</section>`;

const factTemplate = (data) => html`
<div class="fact">
    <img src="${data.imageUrl}" alt="example1" />
    <h3 class="category">${data.category}</h3>
    <p class="description">${data.description}</p>
    <a class="details-btn" href="/details/${data._id}">More Info</a>
  </div>`;

export async function dashboardView(ctx) {
  ctx.updateNavBar();
  const factsData = await getAllFacts();
  
  render(dashboardTemplate(factsData), root);
}