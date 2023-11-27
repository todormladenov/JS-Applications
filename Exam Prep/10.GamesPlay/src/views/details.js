import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllComments } from "../services/comentsService.js";
import { commentTemplate, commentsFormTemplate, onSubmit } from "./coments.js";
import { deleteGame, getGameById } from "../services/gameService.js";
import { createSubmitHandler } from "../services/utils.js";

const detailsTemplate = (game, deleteHandler, onSubmit) => html`
<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">
    <div class="game-header">
        <img class="game-img" src=${game.imageUrl} />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type"> ${game.category}</p>
    </div>
    <p class="text">${game.summary}</p>
    <!-- Bonus ( for Guests and Users ) -->
    <div class="details-comments">
    <h2>Comments:</h2>
    ${game.comments.length
        ? html`
        <ul>
        ${game.comments.map(c => commentTemplate(c))}
        </ul>`
        : html`<p class="no-comment">No comments.</p>`}        
    </div>
        ${game.isOwner
        ? html`
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a href="javascript:void(0)" class="button" @click=${deleteHandler}>Delete</a>
        </div>`
        : nothing}
</div>
${!game.isOwner && game.user
        ? commentsFormTemplate(onSubmit)
        : nothing}
</section>`;

export async function detailsView(ctx) {
    const gameId = ctx.params.id;
    const user = ctx.user();
    const [game, comments] = await Promise.all([
        getGameById(gameId),
        getAllComments(gameId)]);

    if (user) {
        game.isOwner = user._id == game._ownerId;
        game.user = user;
    }
    game.comments = comments;
    ctx.render(detailsTemplate(game, deleteHandler, createSubmitHandler(ctx, onSubmit)));

    async function deleteHandler() {
        if (confirm(`Are you sure you want to delete ${game.title}`)) {
            await deleteGame(gameId);
            ctx.page.redirect('/');
        }
    }
}