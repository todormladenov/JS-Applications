import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

const createTemplate = (onSubmit, errorMsg) => html`
<section id="create">
<article class="narrow">
    <header class="pad-med">
        <h1>New Team</h1>
    </header>
    <form id="create-form" class="main-form pad-large" @submit=${onSubmit}>
    ${errorMsg ? html`<div class="error">${errorMsg}.</div>` : nothing}
        <label>Team name: <input type="text" name="name"></label>
        <label>Logo URL: <input type="text" name="logoUrl"></label>
        <label>Description: <textarea name="description"></textarea></label>
        <input class="action cta" type="submit" value="Create Team">
    </form>
</article>
</section>`;

let _router = undefined;
let _render = undefined;
let _teamService = undefined;

export function initialize(router, render, teamService){
    _router = router;
    _render = render;
    _teamService = teamService;
}

export function createView(ctx) {
    _render(createTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const name = formData.get('name').trim();
        const logoUrl = formData.get('logoUrl').trim();
        const description = formData.get('description').trim();

        try {
            if (name == '' || logoUrl == '' || description == '') {
                throw new Error('All fields are required!');
            }

            await _teamService.createRequest({ name, logoUrl, description });
            _router.redirect('/browse');
        } catch (error) {
            _render(createTemplate(onSubmit, error.message));
        }
    }
}