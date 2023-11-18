import { html } from "../node_modules/lit-html/lit-html.js";
import { registerRequest } from "./requests.js";

const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form class="register-form" @submit=${onSubmit}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;

export function registerView(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('re-password').trim();

        try {
            if (email == '' || password == '') {
                throw new Error('All fields are required!');
            }

            if (password != rePass) {
                throw new Error('Passwords must match!');
            }

            const user = await registerRequest({ email, password });
            localStorage.setItem('user', JSON.stringify(user));
            ctx.page.redirect('/')
        } catch (error) {
            return alert(error.message);
        }
    }
}
