import { render, html } from "../node_modules/lit-html/lit-html.js";
import { registerRequest } from "./requests.js";

const root = document.querySelector('main');

const registerTemplate = (onSubmit) => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${onSubmit}>
              <input type="text" name="email" id="register-email" placeholder="email"/>
              <input type="password" name="password" id="register-password" placeholder="password"/>
              <input type="password" name="re-password" id="repeat-password" placeholder="repeat password"/>
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>`;

export function registerView(ctx) {
  ctx.updateNavBar();
  render(registerTemplate(onSubmit), root)

  async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get('email').trim();
    let password = formData.get('password').trim();
    let rePassword = formData.get('re-password').trim();

    try {
      if (email == '' || password == '') {
        throw new Error('All fields are required!')
      }

      if (password != rePassword) {
       throw new Error('Passwords must match!') 
      }

      const user = await registerRequest({email, password});
      localStorage.setItem('user', JSON.stringify(user));
      e.target.reset();
      ctx.page.redirect('/');
    } catch (error) {
      return alert(`Error: ${error.message}`);
    }
  }
}