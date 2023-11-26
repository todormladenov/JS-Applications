import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../services/userService.js";
import { createSubmitHandler } from "../services/utils.js";

const loginTemplate = (onSubmit) => html`
<section id="loginPage">
<form class="loginForm" @submit=${onSubmit}>
    <img src="./images/logo.png" alt="logo" />
    <h2>Login</h2>
    <div>
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>
    <div>
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>
    <button class="btn" type="submit">Login</button>
    <p class="field"><span>If you don't have profile click <a href="/register">here</a></span></p>
</form>
</section>`;

export function loginView(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    try {
        if (data.email.trim() == '' || data.password.trim() == '') {
            throw new Error('All fields are required!');
        }

        await login(data.email, data.password);
        event.target.reset();
        ctx.page.redirect('/');
    } catch (error) {
        return alert(error.message);
    }
}