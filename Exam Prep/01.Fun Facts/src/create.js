import { render, html } from "../node_modules/lit-html/lit-html.js";
import { createRequest } from "./requests.js";

const root = document.querySelector('main');

const createTemplate = (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input type="text" name="category" id="category" placeholder="Category"/>
              <input type="text" name="image-url" id="image-url"placeholder="Image URL"/>
              <textarea id="description" name="description" placeholder="Description" rows="10" cols="50"></textarea>
              <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="10" cols="50"></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
        </section>`;

export function createView(ctx) {
  ctx.updateNavBar();
  render(createTemplate(onSubmit), root);

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

      const newIdea = await createRequest({ category, imageUrl, description, moreInfo });
      ctx.page.redirect('/dashboard');
    } catch (error) {
      return alert(`Error: ${error.message}`)
    }
  }
}