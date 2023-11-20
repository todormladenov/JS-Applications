import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { navBarTemplate } from "../nav/navBar.js";

const content = document.getElementById('content');
const layout = (sectionTemplate) => html`
<header id="titlebar" class="layout">
    ${navBarTemplate(getUser())}
</header>
<main>
    ${sectionTemplate}
</main>
<footer id="footer">
    SoftUni &copy; 2014-2021
</footer>`;

export const generate = (sectionTemplate) => render(layout(sectionTemplate), content)