import { render, html } from "../node_modules/lit-html/lit-html.js";
import { createDeleteRequest, getAllLikes, getItemById, getOwnLike, sendLikeRequest } from "./requests.js";

const root = document.querySelector('main');

const detailsTemplate = (factData, isOwner, user, deleteFact, likes, sendLike, ownLike) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${factData.imageUrl}" alt="example1" />
            <p id="details-category">${factData.category}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p id="description">${factData.description}</p>
                    <p id ="more-info">${factData.moreInfo}</p>
                </div>
                <h3>Likes:<span id="likes">${likes}</span></h3>
               ${isOwner ? html`
               <div id="action-buttons">
               <a href="/edit/${factData._id}" id="edit-btn">Edit</a>
               <a href="javascript:void(0)" id="delete-btn" @click=${deleteFact}>Delete</a>` : null}
                ${user && !isOwner && ownLike <= 0 ? html`
                <a href="javascript:void(0)" id="like-btn" @click=${sendLike}>Like</a>` : null}          
                </div >
            </div >
        </div >
      </section > `;

export async function detailsView(ctx) {
    const factId = ctx.params.id;
    const user = JSON.parse(localStorage.getItem('user'));
    const [factData, likes, ownLike] = await Promise.all([getItemById(factId), getAllLikes(factId), getOwnLike(factId, user)]);
    const isOwner = user && user._id == factData._ownerId;
    render(detailsTemplate(factData, isOwner, user, deleteFact, likes, sendLike, ownLike), root);

    async function deleteFact() {
        await createDeleteRequest(factId);
        ctx.page.redirect('/dashboard');
    }

    async function sendLike() {
        await sendLikeRequest({ factId });
        detailsView(ctx);
    }
}