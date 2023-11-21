import { html } from "../node_modules/lit-html/lit-html.js";
import { getUser, logout } from "./authService.js";

export const navBarTemplate = () => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
<nav>
    <div>
        <a href="/catalog">Products</a>
    </div>
        ${getUser() ? userView(logout) : guestView()}
</nav>`;

const userView = () => html`
<div class="user">
    <a href="/create">Add Product</a>
    <a href="javascript:void(0)" @click=${logout}>Logout</a>
</div>`;
const guestView = () => html`
<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`;
