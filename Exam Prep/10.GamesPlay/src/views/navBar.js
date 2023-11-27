import { html } from "../../node_modules/lit-html/lit-html.js";

export const navBarTemplate = (user) => html`
<h1><a class="home" href="/">GamesPlay</a></h1>
<nav>
    <a href="/catalog">All games</a>
    ${user
        ? userView
        : guestView}
</nav>`;

const userView = html`
<div id="user">
    <a href="/create">Create Game</a>
    <a href="/logout">Logout</a>
</div>`;

const guestView = html`
<div id="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`;