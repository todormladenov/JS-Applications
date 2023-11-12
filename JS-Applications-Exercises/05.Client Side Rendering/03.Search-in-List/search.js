import { towns } from "./towns.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";

const townsElement = document.getElementById('towns');
const result = document.getElementById('result');
const template = (towns) => html`<ul>${towns.map(town => html`<li>${town}</li>`)}</ul>`;
const matchTemplate = (towns, match) => html`<ul>
${towns.map(town => html`<li class=${town.includes(match) ? 'active' : ''}>${town}</li>`)}
</ul>`;
render(template(towns), townsElement);

document.querySelector('button').addEventListener('click', search);

function search() {
   const searchText = document.getElementById('searchText');

   if (searchText.value == '') {
      return;
   }
   
   const match = searchText.value;
   const matches = towns.filter(town => town.includes(match));
   render(matchTemplate(towns, match), townsElement);
   result.textContent = `${matches.length} matches found`;
   searchText.value = '';
}

