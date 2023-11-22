import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { navBarTemplate } from "../views/navBar.js";

const layout = (templateResult) => html`
<header>
    ${navBarTemplate()}
</header>
<main>
    ${templateResult}
</main>`;

const wrapper = document.getElementById('wrapper');
export const generate = (templateResult) => render(layout(templateResult), wrapper)
