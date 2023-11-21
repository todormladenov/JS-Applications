import { html } from "../node_modules/lit-html/lit-html.js";

const homeTemplate = () => html`
<section id="home">
    <imgsrc="./images/beauty-g0d19af267_1920-removebg.png"alt="home"/>
    <h2>Looking for the best beauty products?</h2>
    <h3>You are in the right place!</h3>
</section>`;

let _render = undefined;

export function init(render) {
    _render = render;
}

export function homeView() {
    _render(homeTemplate());
}