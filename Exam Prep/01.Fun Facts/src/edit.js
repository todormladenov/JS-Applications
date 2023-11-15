import { render, html } from "../node_modules/lit-html/lit-html.js";
import { createEditRequest, getItemById } from "./requests.js";

const root = document.querySelector('main');

const editTemplate = (factData, onSubmit) => html`
<section id="edit">
<div class="form">
  <h2>Edit Fact</h2>
  <form class="edit-form" @submit=${onSubmit}>
    <input type="text" name="category" id="category" placeholder="Category" .value=${factData.category}/>
    <input type="text" name="image-url" id="image-url" placeholder="Image URL" .value=${factData.imageUrl}/>
    <textarea id="description" name="description" placeholder="Description" rows="10" cols="50">${factData.description}</textarea>
    <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="10" cols="50">${factData.moreInfo}</textarea>
    <button type="submit">Post</button>
  </form>
</div>
</section>`;

export async function editView(ctx) {
  const factData = await getItemById(ctx.params.id);
  render(editTemplate(factData, onSubmit), root);

  async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let category = formData.get('category').trim();
    let imageUrl = formData.get('image-url').trim();
    let description = formData.get('description').trim();
    let moreInfo = formData.get('additional-info').trim();

    try {
      if (category == '' || imageUrl == '' || description == '' || moreInfo == '') {
        throw new Error('All fields are required!');
      }

      await createEditRequest({ category, imageUrl, description, moreInfo }, ctx.params.id);
      ctx.page.redirect(`/details/${ctx.params.id}`);
    } catch (error) {
      return alert(`Error: ${error.message}`);
    }
  }
}