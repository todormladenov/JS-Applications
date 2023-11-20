import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

const editTemplate = (onSubmit, teamData, errorMsg) => html`
<section id="edit">
<article class="narrow">
    <header class="pad-med">
        <h1>Edit Team</h1>
    </header>
    <form id="edit-form" class="main-form pad-large" @submit=${onSubmit}>
    ${errorMsg ? html`<div class="error">${errorMsg}</div>` : nothing}
        <label>Team name: <input type="text" name="name" .value=${teamData.name}></label>
        <label>Logo URL: <input type="text" name="logoUrl" .value=${teamData.logoUrl}></label>
        <label>Description: <textarea name="description">${teamData.description}</textarea></label>
        <input class="action cta" type="submit" value="Save Changes">
    </form>
</article>
</section>`;

let _router = undefined;
let _render = undefined;
let _teamService = undefined;

export function initialize(router, render, teamService, memberService) {
    _router = router;
    _render = render;
    _teamService = teamService;
}

export async function editView(ctx) {
    const teamData = await _teamService.getItemById(ctx.params.id);
    _render(editTemplate(onSubmit, teamData));

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
            
            await _teamService.createEditRequest({ name, logoUrl, description }, ctx.params.id);
            _router.redirect(`/details/${ctx.params.id}`);
        } catch (error) {
            _render(editTemplate(onSubmit, teamData, error.message));
        }
    }
}