import { html } from "../node_modules/lit-html/lit-html.js";

export const user = () => JSON.parse(localStorage.getItem('user'));

export const navBarTemplate = () => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
    <nav>
        <div>
          <a href="/events">Events</a>
        </div>
        ${user() ? userView() : guestView()}
    </nav>`;

const guestView = () => html`
<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`;

const userView = () => html`
<div class="user">
    <a href="/create">Add Event</a>
    <a href="/logout">Logout</a>
</div>`;