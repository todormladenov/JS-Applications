import { render, html } from "../node_modules/lit-html/lit-html.js";
import { loginRequest } from "./requests.js";

const root = document.querySelector('main');

const loginTemplate = (onSubmit) => html`
<section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onSubmit}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="#">Create an account</a>
              </p>
            </form>
          </div>
        </section>`;

export function loginView(ctx) {
    ctx.updateNavBar();
    render(loginTemplate(onSubmit), root)

    async function onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();

        try {
          if (email == '' || password == '') {
            throw new Error('All fields are required!')
          }
            const user = await loginRequest({ email, password });
            localStorage.setItem('user', JSON.stringify(user));
            e.target.reset();
            ctx.page.redirect('/');
        } catch (error) {
            return alert(`Error: ${error.message}`);
        }
    }
}