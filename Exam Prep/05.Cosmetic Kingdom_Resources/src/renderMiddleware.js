import { html, render } from "../node_modules/lit-html/lit-html.js";
import { navBarTemplate } from "./navBar.js";

const wrapper = document.getElementById('wrapper');
const layout = (templateResult) => html`
<header>
    ${navBarTemplate()}     
</header>
<main>
    ${templateResult}
</main>`;
export const generate = (templateResult) => render(layout(templateResult), wrapper);

