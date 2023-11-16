import { render, html } from "../node_modules/lit-html/lit-html.js";
import { getSearchedItem } from "./requests.js";

const root = document.getElementById('root');

const searchTemplate = (onSubmit, data) => html`
<section id="search">
  <div class="form">
    <h4>Search</h4>
    <form class="search-form" @submit=${onSubmit}>
      <input type="text" name="search" id="search-input" />
      <button class="button-list">Search</button>
    </form>
  </div>
      <h4 id="result-heading">Results:</h4>
      ${data && data.length ? html`${data.map(el => resultTemplate(el))}` : null}
      ${data && !data.length ? html`<h2 class="no-avaliable">No result.</h2>` : null}
</section>`;

const resultTemplate = (data) => html`
  <div class="motorcycle">
    <img src="${data.imageUrl}" alt="example1" />
    <h3 class="model">${data.model}</h3>
    <a class="details-btn" href="/details/${data._id}">More Info</a>
  </div>         
</div>
</section>`;

export function viewSearch(ctx) {
  ctx.updateNavBar();
  render(searchTemplate(onSubmit), root);

  async function onSubmit(e){
    e.preventDefault();
    
    const searchText = document.getElementById('search-input').value.trim();
    if (searchText == '') {
      return alert('Search field is required!');
    }
    
    const query = searchText.split(' ').join('%20');
    const searchedData = await getSearchedItem(query);
    document.getElementById('search-input').value = '';
    render(searchTemplate(onSubmit, searchedData), root);
  }
}