import { html } from "../node_modules/lit-html/lit-html.js";
import { createDeleteRequest, getAllGoing, getItemById, getOwnGoing, sendGoingRequest } from "./requests.js";

const detailsTemplate = (evenData, isOwner, user, onDelete, sendGoing, totalGoing, ownGoing) => html`
<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${evenData.imageUrl} alt="example1" />
  <p id="details-title">${evenData.name}</p>
  <p id="details-category">Category: <span id="categories">${evenData.category}</span></p>
  <p id="details-date">Date:<span id="date">${evenData.date}</span></p>
  <div id="info-wrapper">
    <div id="details-description">
      <span>${evenData.description}</span>
    </div>
    ${isOwner ? html`
    <div id="action-buttons">
        <a href=/edit/${evenData._id} id="edit-btn">Edit</a>
        <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
    </div>` : null}
        ${user && ownGoing <= 0 && !isOwner ? html`
    <div id="action-buttons">
        <a href="javascript:void(0)" id="go-btn" @click=${sendGoing}>Going</a>
    </div>` : null}
  </div>
  <h3>Going: <span id="go">${totalGoing}</span> times.</h3>
</div>
</section>`;

export async function detailsView(ctx) {
    const eventId = ctx.params.id
    const user = ctx.user();
    const [totalGoing, ownGoing, evenData] = await Promise.all([getAllGoing(eventId), getOwnGoing(eventId, user), getItemById(eventId)]);
    const isOwner = user && user._id == evenData._ownerId;
    ctx.render(detailsTemplate(evenData, isOwner, user, onDelete, sendGoing, totalGoing, ownGoing));

    async function onDelete() {
        if (confirm('Are you sure you want to delete this?')) {
            await createDeleteRequest(eventId);
            ctx.page.redirect('/events');
        }
    }

    async function sendGoing() {
        await sendGoingRequest({ eventId });
        ctx.page.redirect(`/details/${eventId}`);
    }

}