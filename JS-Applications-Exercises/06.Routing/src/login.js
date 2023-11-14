import { render, html } from "../node_modules/lit-html/lit-html.js";
import { loginRequest } from "./requests.js";

const container = document.querySelector('.container');

const loginTemplate = (login) => html`
<div class="row space-top">
<div class="col-md-12">
    <h1>Login User</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${login}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input class="form-control" id="email" type="text" name="email">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input class="form-control" id="password" type="password" name="password">
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
    </div>
</div>
</form>`;

export function showLogin(cxt) {
    render(loginTemplate(login), container);

    async function login(e) {
        e.preventDefault();
        let form = e.currentTarget
        let formData = new FormData(form);
    
        let email = formData.get('email');
        let password = formData.get('password');
    
        const user = await loginRequest({ email, password });
        localStorage.setItem('user', JSON.stringify(user))
        form.reset();
        cxt.updateNav();
        cxt.page.redirect('/');
    }
}