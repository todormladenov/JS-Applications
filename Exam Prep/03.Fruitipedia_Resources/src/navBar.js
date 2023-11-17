import { html } from "../node_modules/lit-html/lit-html.js";
import { getUser } from "./authService.js";

export const navBarTemplate = () => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
<nav>
  <div>
    <a href="/catalog">Fruits</a>
    <a href="/search">Search</a>
  </div>
  ${getUser() ? userView() : guestView()}
</nav>
</header>`;

const userView = () => html`
<div class="user">
    <a href="/create">Add Fruit</a>
    <a href="/logout">Logout</a>
</div>`;

const guestView = () => html`
<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`;



