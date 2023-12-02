import { html } from "../../node_modules/lit-html/lit-html.js";

export const navBarTemplate = (user) => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
<nav>
  <div>
    <a href="/characters">Characters</a>
  </div>
    ${user
        ? userView
        : guestView}
</nav>`;

const userView = html`
<div class="user">
    <a href="/create">Add Character</a>
    <a href="/logout">Logout</a>
</div>`;

const guestView = html`
<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`;