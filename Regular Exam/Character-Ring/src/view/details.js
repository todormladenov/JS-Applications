import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteCharacter, getCharacterById } from "../services/characterService.js";
import { getCharacterLikes, getOwnLike, sendLike } from "../services/likeService.js";

const detailsTemplate = (character, deleteHandler, likeHandler) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${character.imageUrl} alt="example1" />
  <div>
    <p id="details-category">${character.category}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p id="description">${character.description}</p>
        <p id="more-info">${character.moreInfo}</p>
      </div>
    </div>
    <h3>Is This Useful:<span id="likes">${character.likes}</span></h3>
    ${character.isOwner
        ? html`
        <div id="action-buttons">
            <a href="/edit/${character._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${deleteHandler}>Delete</a>
        </div>`
        : nothing}
        ${!character.isOwner && character.user && character.ownLike
        ? html`
            <div id="action-buttons">
                <a href="javascript:void(0)" id="like-btn" @click=${likeHandler}>Like</a>
            </div>`
        : nothing}    
  </div>
</div>
</section>`;

export async function detailsView(ctx) {
    const characterId = ctx.params.id;
    const user = ctx.user();
    const [character, likes, ownLike] = await Promise.all([
        getCharacterById(characterId),
        getCharacterLikes(characterId),
        getOwnLike(characterId, user)]);

    if (user) {
        character.isOwner = user._id == character._ownerId;
        character.user = user;
    }
    character.likes = likes;
    character.ownLike = ownLike
    ctx.render(detailsTemplate(character, deleteHandler, likeHandler));

    async function deleteHandler() {
        if (confirm(`Are you sure you want to delete ${character.category}`)) {
            await deleteCharacter(characterId);
            ctx.page.redirect('/characters');
        }
    }

    async function likeHandler() {
        await sendLike({ characterId });
        ctx.page.redirect(`/details/${characterId}`);
    }
}