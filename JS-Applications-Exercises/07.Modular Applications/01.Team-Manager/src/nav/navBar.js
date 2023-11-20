import { html } from "../../node_modules/lit-html/lit-html.js";

export const navBarTemplate = (user) => html`
<a href="/" class="site-logo">Team Manager</a>
<nav>
    <a href="/browse" class="action">Browse Teams</a>
    ${user ? userView() : guestView()}
</nav>`

const guestView = () => html`
<div class="guest">
    <a href="/login" class="action">Login</a>
    <a href="/register" class="action">Register</a>
</div>`;

const userView = () => html`
<div class="user">
    <a href="/my-teams" class="action">My Teams</a>
    <a href="/logout" class="action">Logout</a>
</div>`;