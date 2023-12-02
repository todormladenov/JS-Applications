import { html } from "../../node_modules/lit-html/lit-html.js";
import { createCharacter } from "../services/characterService.js";
import { createSubmitHandler } from "../services/utils.js";

const createTemplate = (onSubmit) => html`
<section id="create">
<div class="form">
  <img class="border" src="./images/border.png" alt="">
  <h2>Add Character</h2>
  <form class="create-form" @submit=${onSubmit}>
    <input type="text" name="category" id="category" placeholder="Character Type" />
    <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
    <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
    <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2"
      cols="10"></textarea>
    <button type="submit">Add Character</button>
  </form>
  <img class="border" src="./images/border.png" alt="">
</div>
</section>`;

export function createView(ctx) {
  ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
  try {
    const emptyField = Object.values(data).some(f => f.trim() == '');
    if (emptyField) {
      throw new Error('All fields are required!');
    }

    const charData = {
      category: data.category,
      imageUrl: data['image-url'],
      description: data.description,
      moreInfo: data['additional-info']
    }

    await createCharacter(charData);
    event.target.reset();
    ctx.page.redirect('/characters');
  } catch (error) {
    return alert(error.message);
  }
}