import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { navBarTemplate } from "../views/navBar.js";

const layout = (user, templateResult) => html`
<header>
${navBarTemplate(user)}
</header>
<main id="main-content">
${templateResult}
</main>`;

const box = document.getElementById('box')
const generate = (user, templateResult) => render(layout(user, templateResult), box);

export function renderContext(ctx, next){
    const user = ctx.user();
    ctx.render = generate.bind(null, user);

    next();
}