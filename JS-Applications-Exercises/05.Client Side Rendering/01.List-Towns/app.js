import { html, render } from "../node_modules/lit-html/lit-html.js";

const root = document.getElementById('root');
document.getElementById('btnLoadTowns').addEventListener('click', onClick);

const template = (data) => html`
<ul>${data.map(x => html`<li>${x}</li>`)}</ul>
`;

function onClick(e) {
    e.preventDefault();
    
    const towns = document.getElementById('towns');
    const townsArray = towns.value.split(' ');

    if (towns.value == '') {
        return;
    }

    render(template(townsArray), root);
    towns.value = '';
}
