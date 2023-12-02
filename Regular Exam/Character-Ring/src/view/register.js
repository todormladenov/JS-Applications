import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../services/userService.js";
import { createSubmitHandler } from "../services/utils.js";

const registerTemplate = (onSubmit) => html`
<section id="register">
<div class="form">
  <img class="border" src="./images/border.png" alt="">
  <h2>Register</h2>
  <form class="register-form" @submit=${onSubmit}>
    <input type="text" name="email" id="register-email" placeholder="email" />
    <input type="password" name="password" id="register-password" placeholder="password" />
    <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="/login">Login</a></p>
  </form>
  <img class="border" src="./images/border.png" alt="">
</div>
</section>`;

export function registerView(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
}

async function onSubmit(ctx, data, event) {
    try {
        if (data.email.trim() == '' || data.password.trim() == '') {
            throw new Error('All fields are required!');
        }

        if (data.password != data['re-password']) {
            throw new Error('Passwords must match!');
        }

        await register(data.email, data.password);
        event.target.reset();
        ctx.page.redirect('/');
    } catch (error) {
        return alert(error.message);
    }
}