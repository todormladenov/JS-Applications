import { html, render } from "../node_modules/lit-html/lit-html.js";

const menu = document.getElementById('menu');
const form = document.querySelector('form');
const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
form.addEventListener('submit', addItem);
const template = (data) => html`${data.map(el => html`<option value=${el._id}>${el.text}</option>`)}`

async function getTowns() {
    let response = await fetch(url);
    let data = await response.json();

    return Object.values(data);
}

let towns = await getTowns();
render(template(towns), menu);

async function addItem(e) {
    e.preventDefault();
    
    let text = document.getElementById('itemText').value;
    let response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ text })
    });
    document.getElementById('itemText').value = '';
    towns = await getTowns();
    render(template(towns), menu);
}