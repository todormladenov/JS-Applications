import { html } from "../node_modules/lit-html/lit-html.js";
import { getSearchedItem } from "./requests.js";

const searchTemplate = (onSubmit, result) => html`
<section id="search">
<div class="form">
  <h2>Search</h2>
  <form class="search-form" @submit=${onSubmit}>
    <input type="text" name="search" id="search-input" />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>
<div class="search-result">
    ${result && result.length ? result.map(fruit => resultTemplate(fruit)) : 
    (result && !result.length) ? html`<p class="no-result">No result.</p>` : null}
</div>
</section>`;

const resultTemplate = (fruit) => html`
<div class="fruit">
<img src=${fruit.imageUrl} alt="example1" />
<h3 class="title">${fruit.name}</h3>
<p class="description">${fruit.description}</p>
<a class="details-btn" href="/details/${fruit._id}">More Info</a>
</div>`;

export function viewSearch(ctx) {
    ctx.render(searchTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const search = formData.get('search').trim();

        if (search == '') {
            return alert('All fields are required!');
        }

        const query = search.split(' ').join('%20');

        const result = await getSearchedItem(query);
        ctx.render(searchTemplate(onSubmit, result));
    }
}