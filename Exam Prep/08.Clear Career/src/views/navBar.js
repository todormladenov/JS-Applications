import { html } from "../../node_modules/lit-html/lit-html.js";

export const navBarTemplate = (user) => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.jpg" alt="" /></a>
<nav>
  <div>
    <a href="/catalog">Dashboard</a>
  </div>
    ${user ? userView : guestView}
</nav>`;

const guestView = html`
<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`;

const userView = html`
<div class="user">
    <a href="/create">Create Offer</a>
    <a href="/logout">Logout</a>
</div>`;