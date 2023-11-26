import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { navBarTemplate } from "../views/navBar.js";

const layout = (user, templateResult) => html`
<header>
    ${navBarTemplate(user)}
</header>
<mani id="content">
    ${templateResult}
</main>`;

const root = document.getElementById('root');
const generate = (user, templateResult) => render(layout(user, templateResult), root);

export function renderContext(ctx, next) {
    const user = ctx.user();
    ctx.render = generate.bind(null, user);

    next();
}