import { html } from "../../node_modules/lit-html/lit-html.js";

export const navBarTemplate = (user) => html`
<nav>
<section class="logo">
    <img src="./images/logo.png" alt="logo">
</section>
<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    ${user
        ? userView
        : guestView}       
</ul>
</nav>`;

const userView = html`
<li><a href="/create">Create Postcard</a></li>
<li><a href="/logout">Logout</a></li>`;

const guestView = html`
<li><a href="/login">Login</a></li>
<li><a href="/register">Register</a></li>`;