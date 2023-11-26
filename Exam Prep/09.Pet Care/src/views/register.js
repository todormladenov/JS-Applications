import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../services/userService.js";
import { createSubmitHandler } from "../services/utils.js";

const registerTemplate = (onSubmit) => html`
<section id="registerPage">
    <form class="registerForm" @submit=${onSubmit}>
        <img src="./images/logo.png" alt="logo" />
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>
        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>
        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>
        <button class="btn" type="submit">Register</button>
        <p class="field"><span>If you have profile click <a href="/login">here</a></span></p>
    </form>
</section>`;

export function registerView(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    try {
        if (data.email.trim() == '' || data.password.trim() == '') {
            throw new Error('All fields are required!');
        }

        if (data.password != data.repeatPassword) {
            throw new Error('Passwords must match!');
        }

        await register(data.email, data.password);
        event.target.reset();
        ctx.page.redirect('/');
    } catch (error) {
        return alert(error.message);
    }
}