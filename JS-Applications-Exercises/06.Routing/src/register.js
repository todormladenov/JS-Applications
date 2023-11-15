import { render, html } from "../node_modules/lit-html/lit-html.js"
import { registerRequest } from "./requests.js";

const container = document.querySelector('.container');

const registerTemplate = (register, errorMsg, errors) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${register}>
            <div class="row space-top">
                <div class="col-md-4">
                ${errorMsg ? html`<div class="form-group">${errorMsg}</div>` : null}
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class=${'form-control' + (errors.email ? ' is-invalid' : '')} id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class=${'form-control' + (errors.password ? ' is-invalid' : '')} id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class=${'form-control' + (errors.rePass ? ' is-invalid' : '')} id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
</form>`;

export function showRegister(cxt) {
    render(registerTemplate(register, null, {}), container);

    async function register(e) {
        e.preventDefault();
        let form = e.currentTarget
        let formData = new FormData(form);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('rePass').trim();

        try {
            if (email == '' || password == '') {
                throw ({
                    error: new Error('All fields are required!'),
                    errors: {
                        email: email == '',
                        password: password == ''
                    }
                });
            }
            if (password != rePass) {
                throw ({
                    error: new Error('Passwords don\'t match!'),
                    errors: {
                        rePass: true,
                        password: true
                    }
                });
            }

            const user = await registerRequest({ email, password });
            localStorage.setItem('user', JSON.stringify(user))
            form.reset();
            cxt.updateNav();
            cxt.page.redirect('/');
        } catch (err) {
            const message = err.message || err.error.message
            render(registerTemplate(register, message, err.errors), container);
        }
    }
}