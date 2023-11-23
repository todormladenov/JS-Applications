import { html } from "../../node_modules/lit-html/lit-html.js";
import { create } from "../services/shoesService.js";
import { createSubmitHandler } from "../services/utils.js";

const createTemplate = (onSubmit) => html`
<section id="create">
<div class="form">
  <h2>Add item</h2>
  <form class="create-form" @submit=${onSubmit}>
    <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
    <input type="text" name="model" id="shoe-model" placeholder="Model" />
    <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
    <input type="text" name="release" id="shoe-release" placeholder="Release date" />
    <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
    <input type="text" name="value" id="shoe-value" placeholder="Value" />
    <button type="submit">post</button>
  </form>
</div>
</section>`;

export function createView(ctx){
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event){
    try {
        if (Object.values(data).some(field => field.trim() == '')) {
            throw new Error('All fields are required!')
        }

        await create(data.brand, data.model, data.imageUrl, data.release, data.designer, data.value);
        event.target.reset();
        ctx.page.redirect('/catalog');
    } catch (error) {
        return alert(error.message);
    }
}