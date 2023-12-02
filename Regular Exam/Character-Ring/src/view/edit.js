import { html } from "../../node_modules/lit-html/lit-html.js";
import { getCharacterById, updateCharacter } from "../services/characterService.js";
import { createSubmitHandler } from "../services/utils.js";

const editTemplate = (character, onSubmit) => html`
<section id="edit">
<div class="form">
  <img class="border" src=${character.imageUrl} alt="">
  <h2>Edit Character</h2>
  <form class="edit-form" @submit=${onSubmit}>
    <input type="text" name="category" id="category" placeholder="Character Type" .value=${character.category}>
    <input type="text" name="image-url" id="image-url" placeholder="Image URL" .value=${character.imageUrl}>
    <textarea id="description" name="description" placeholder="Description" rows="2" cols="10">${character.description}</textarea>
    <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2"cols="10">${character.moreInfo}</textarea>
    <button type="submit">Edit</button>
  </form>
  <img class="border" src="./images/border.png" alt="">
</div>
</section>`;

export async function editView(ctx) {
    const charId = ctx.params.id
    const character = await getCharacterById(charId);

    ctx.render(editTemplate(character, createSubmitHandler(ctx, onSubmit)));
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

        await updateCharacter(ctx.params.id, charData);
        event.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    } catch (error) {
        return alert(error.message);
    }
}