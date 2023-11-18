import { html } from "../node_modules/lit-html/lit-html.js";
import { loginRequest } from "./requests.js";

const loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form class="login-form" @submit=${onSubmit}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">Not registered? <a href="/register">Create an account</a></p>
        </form>
    </div>
</section>`;

export function loginView(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        try {
            if (email == '' || password == '') {
                throw new Error('All fields are required!');
            }

            const user = await loginRequest({ email, password });
            localStorage.setItem('user', JSON.stringify(user));
            ctx.page.redirect('/');
        } catch (error) {
            return alert(error.message);
        }

    }
}
