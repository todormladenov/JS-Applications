import { render, html } from "../node_modules/lit-html/lit-html.js"
import { registerRequest } from "./requests.js";

const container = document.querySelector('.container');

const registerTemplate = (register) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${register}>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
</form>`;

export function showRegister(cxt) {
    render(registerTemplate(register), container);

    async function register(e) {
        e.preventDefault();
        let form = e.currentTarget
        let formData = new FormData(form);

        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('rePass');

        if (password != rePass) {
            alert('Password must match Repeat Password');
            return;
        }

        const user = await registerRequest({ email, password });
        localStorage.setItem('user', JSON.stringify(user))
        form.reset();
        cxt.updateNav();
        cxt.page.redirect('/');
    }
}