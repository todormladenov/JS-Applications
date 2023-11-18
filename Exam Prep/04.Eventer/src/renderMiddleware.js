import {html, render} from "../node_modules/lit-html/lit-html.js";
import { navBarTemplate, user } from "./navBar.js";

const wrapper = document.getElementById('wrapper')
const layout = (sectionTemplate) => html`
<header>
    ${navBarTemplate()}
</header>
<main>
    ${sectionTemplate}
</main>`;

const generate = (sectionTemplate) => render(layout(sectionTemplate), wrapper);

export function decorateContext(ctx, next){
    ctx.render = generate;
    ctx.user = user;
    next();
}