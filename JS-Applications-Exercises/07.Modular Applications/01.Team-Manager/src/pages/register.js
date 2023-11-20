import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

const registerTemplate = (onSubmit, errorMsg) => html`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form id="register-form" class="main-form pad-large" @submit=${onSubmit}>
        ${errorMsg ? html`<div class="error">${errorMsg}.</div>` : nothing}
            <label>E-mail: <input type="text" name="email"></label>
            <label>Username: <input type="text" name="username"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`;

let _router = undefined;
let _render = undefined;
let _authService = undefined;

export function initialize(router, render, authService){
    _router = router;
    _render = render;
    _authService = authService;
}

export function registerView(ctx) {
    _render(registerTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email').trim();
        const username = formData.get('username').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('repass').trim();

        try {
            if (email == '' || password == '' || username == '') {
                throw new Error('All fields are required!');
            }

            if (password != rePass) {
                throw new Error('Passwords must match!');
            }

            const user = await _authService.registerRequest({ email, username, password });
            localStorage.setItem('user', JSON.stringify(user));
            _router.redirect('/');
        } catch (error) {
            _render(registerTemplate(onSubmit, error.message));
        }
    }
}
