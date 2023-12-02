import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllCharacters } from "../services/characterService.js";

const charactersTemplate = (characters) => html`
<h2>Characters</h2>
<section id="characters">
${characters.length
        ? characters.map(c => characterCardTemplate(c))
        : html`<h2>No added Heroes yet.</h2>`}
</section>`;

const characterCardTemplate = (character) => html`
<div class="character">
<img src=${character.imageUrl} />
<div class="hero-info">
  <h3 class="category">${character.category}</h3>
  <p class="description">${character.description}</p>
  <a class="details-btn" href="/details/${character._id}">More Info</a>
</div>`;

export async function charactersView(ctx) {
    const characters = await getAllCharacters();
    ctx.render(charactersTemplate(characters));
}