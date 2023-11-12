import { cats } from "./catSeeder.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";

const allCats = document.getElementById('allCats');
cats.forEach(cat => cat.info = false);

const template = (cats) => html`
<ul>${cats.map(cat => 
    html`<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn" @click=${toggle}>${cat.info ? 'Hide' : 'Show'} status code</button>
        <div class="status" style="${cat.info ? 'display: block;' : 'display: none;'}" id="${cat.id}">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
    </li>`
)}</ul>`

render(template(cats), allCats);

function toggle(e){
    const targetElement = e.currentTarget.parentNode;
    const statusElement = targetElement.querySelector('.status');
    const id = statusElement.id;
    let cat = cats.find(c => c.id == id);

    cat.info = !cat.info;
    render(template(cats), allCats);
}