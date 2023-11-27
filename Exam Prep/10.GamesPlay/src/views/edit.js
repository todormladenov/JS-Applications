import { html } from "../../node_modules/lit-html/lit-html.js";
import { getGameById, updateGame } from "../services/gameService.js";
import { createSubmitHandler } from "../services/utils.js";

const editTemplate = (game, onSubmit) => html`
<section id="edit-page" class="auth">
<form id="edit" @submit=${onSubmit}>
    <div class="container">
        <h1>Edit Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" .value=${game.title}>
        <label for="category">Category:</label>
        <input type="text" id="category" name="category" .value=${game.category}>
        <label for="levels">MaxLevel:</label>
        <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel}>
        <label for="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl}>
        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary">${game.summary}</textarea>
        <input class="btn submit" type="submit" value="Edit Game">
    </div>
</form>
</section>`;

export async function editView(ctx){
    const game = await getGameById(ctx.params.id)
    ctx.render(editTemplate(game, createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event){
    try {
        const emptyField = Object.values(data).some(f => f.trim() == '');
        if (emptyField) {
            throw new Error('All fields are required!');
        }

        await updateGame(ctx.params.id, data);
        event.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    } catch (error) {
        return alert(error.message);
    }
}