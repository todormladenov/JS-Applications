import { html } from "../node_modules/lit-html/lit-html.js";
import { createEditRequest, getItemById } from "./requests.js";

const editTemplate = (fruitData, onSubmit) => html`
<section id="edit">
<div class="form">
  <h2>Edit Fruit</h2>
  <form class="edit-form" @submit=${onSubmit}>
    <input type="text" name="name" id="name" placeholder="Fruit Name" .value=${fruitData.name}/>
    <input type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image URL" .value=${fruitData.imageUrl}/>
    <textarea id="fruit-description" name="description" placeholder="Description" rows="10"cols="50">${fruitData.description}</textarea>
    <textarea id="fruit-nutrition" name="nutrition" placeholder="Nutrition" rows="10" cols="50">${fruitData.nutrition}</textarea>
    <button type="submit">post</button>
  </form>
</div>
</section>`;

export async function viewEdit(ctx) {
    const fruitData = await getItemById(ctx.params.id);
    ctx.render(editTemplate(fruitData, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const name = formData.get('name').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const description = formData.get('description').trim();
        const nutrition = formData.get('nutrition').trim();

        if (name == '' || imageUrl == '' || description == '' || nutrition == '') {
            return alert('All fields are required!');
        }

        await createEditRequest({ name, imageUrl, description, nutrition }, ctx.params.id);
        ctx.page.redirect('/catalog');
    }
}