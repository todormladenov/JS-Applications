import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, update } from "../services/shoesService.js";
import { createSubmitHandler } from "../services/utils.js";

const editTemplate = (shoe, onSubmit) => html`
<section id="edit">
<div class="form">
  <h2>Edit item</h2>
  <form class="edit-form" @submit=${onSubmit}>
    <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value=${shoe.brand}/>
    <input type="text" name="model" id="shoe-model" placeholder="Model" .value=${shoe.model}/>
    <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value=${shoe.imageUrl}/>
    <input type="text" name="release" id="shoe-release" placeholder="Release date" .value=${shoe.release}/>
    <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value=${shoe.designer}/>
    <input type="text" name="value" id="shoe-value" placeholder="Value" .value=${shoe.value}/>
    <button type="submit">post</button>
  </form>
</div>
</section>`;

export async function editView(ctx) {
    const shoe = await getById(ctx.params.id);
    ctx.render(editTemplate(shoe, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    try {
        if (Object.values(data).some(field => field.trim() == '')) {
            throw new Error('All fields are required!')
        }

        await update(ctx.params.id, data.brand, data.model, data.imageUrl, data.release, data.designer, data.value);
        event.target.reset();
        ctx.page.redirect('/details/' + ctx.params.id);
    } catch (error) {
        return alert(error.message);
    }
}