import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getUser } from "../services/utils.js";
import { navBarTemplate } from "../views/navBar.js";

const layout = (templateResult) => html`
<header>
    ${navBarTemplate(getUser())}
</header>
<main>
    ${templateResult}
</main>`

const root = document.getElementById('wrapper');
const generate = (templateResult) => render(layout(templateResult), root);

export function renderContext(ctx, next){
    ctx.render = generate;

    next();
}