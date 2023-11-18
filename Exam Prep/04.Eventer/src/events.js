import { html } from "../node_modules/lit-html/lit-html.js";
import { getAllEvents } from "./requests.js";

const eventsTemplate = (eventsData) => html`
<h2>Current Events</h2>
<section id="dashboard">
  ${eventsData.length ? eventsData.map(event => eventTemplate(event)) : html`<h4>No Events yet.</h4>`}
</section>`;

const eventTemplate = (eventData) => html`
<div class="event">
    <img src=${eventData.imageUrl} alt="example1" />
    <p class="title">${eventData.name}</p>
    <p class="date">${eventData.date}</p>
    <a class="details-btn" href="/details/${eventData._id}">Details</a>
</div>`;

export async function eventsView(ctx) {
    const eventsData = await getAllEvents()
    ctx.render(eventsTemplate(eventsData));
}
