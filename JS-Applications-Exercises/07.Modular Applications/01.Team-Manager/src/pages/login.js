import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

const loginTemplate = (onSubmit, errorMsg) => html`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
        <h1>Login</h1>
        </header>
        <form id="login-form" class="main-form pad-large" @submit=${onSubmit}>
        ${errorMsg ? html`<div class="error">${errorMsg}.</div>` : nothing}   
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
        </footer>
    </article>
</section>`;

let _router = undefined;
let _render = undefined;
let _authService = undefined;

export function initialize(router, render, authService){
    _router = router;
    _render = render;
    _authService = authService
}

export function loginView(ctx) {
    _render(loginTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        try {
            if (email == '' || password == '') {
                throw new Error('All fields are required!')
            }

            const user = await _authService.loginRequest({ email, password });
            localStorage.setItem('user', JSON.stringify(user));
            _router.redirect('/');
        } catch (error) {
            _render(loginTemplate(onSubmit, error.message));
        }
    }
}
