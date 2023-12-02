import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { navBarTemplate } from "../view/navBar.js";

const layout = (user, templateResult) => html`
<header>
${navBarTemplate(user)}
</header>
<main>
${templateResult}
</main>`;

const wrapper = document.getElementById('wrapper')
const generate = (user, templateResult) => render(layout(user, templateResult), wrapper);

export function renderContext(ctx, next){
    const user = ctx.user();
    ctx.render = generate.bind(null, user);

    next();
}