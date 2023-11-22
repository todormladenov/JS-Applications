import { html } from "../../node_modules/lit-html/lit-html.js";

let _authService = undefined;

export function init(authService){
    _authService = authService;
}

export const navBarTemplate = () => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
<nav>
    <div>
        <a href="/dashboard">Dashboard</a>
    </div>
    ${_authService.getUser() ? userView : guestView} 
</nav>`;

const guestView = html`
<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`;

const userView = html`
<div class="user">
    <a href="/add-album">Add Album</a>
    <a href="/logout">Logout</a>
</div>  `