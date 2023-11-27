import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllGames } from "../services/gameService.js";

const catalogTemplate = (games) => html`
<section id="catalog-page">
<h1>All Games</h1>
${games.length
        ? games.map(g => gameTemplate(g))
        : html`<h3 class="no-articles">No articles yet</h3>`}
</section>`;

const gameTemplate = (game) => html`
<div class="allGames">
<div class="allGames-info">
    <img src=${game.imageUrl}>
    <h6>${game.category}</h6>
    <h2>${game.title}</h2>
    <a href="/details/${game._id}" class="details-button">Details</a>
</div>
</div>`

export async function catalogView(ctx) {
    const games = await getAllGames();
    ctx.render(catalogTemplate(games));
}