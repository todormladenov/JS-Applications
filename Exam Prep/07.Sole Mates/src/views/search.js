import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { search } from "../services/shoesService.js";
import { createSubmitHandler } from "../services/utils.js";

const searchTemplate = (onSubmit, result, isLogged) => html`
<section id="search">
<h2>Search by Brand</h2>
<form class="search-wrapper cf" @submit=${onSubmit}>
  <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
  <button type="submit">Search</button>
</form>

<h3>Results:</h3>
<div id="search-container">
${result && result.length 
    ? html`
    <ul class="card-wrapper">
    ${result.map(s => resultTemplate(s, isLogged))}
    </ul>` 
    : nothing}
${result && !result.length ? html`<h2>There are no results found.</h2>` : nothing}
</div>
</section>`;

const resultTemplate = (shoe, isLogged) => html`
<li class="card">
    <img src=${shoe.imageUrl} alt="travis" />
    <p><strong>Brand: </strong><span class="brand">${shoe.brand}</span></p>
    <p><strong>Model: </strong><span class="model">${shoe.model}</span></p>
    <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
    ${isLogged ? html`<a class="details-btn" href="/details/${shoe._id}">Details</a>` : nothing}
</li>`

export function searchView(ctx) {
    ctx.render(searchTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    try {
        if (data.search.trim() == '') {
            throw new Error('All fields are required!')
        }

        const isLogged = ctx.user;
        const result = await search(data.search);
        event.target.reset();
        ctx.render(searchTemplate(createSubmitHandler(ctx, onSubmit), result, isLogged));
    } catch (error) {
        return alert(error.message);
    }
}