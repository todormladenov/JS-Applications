import { html } from "../../node_modules/lit-html/lit-html.js";

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

let _render = undefined;
let _router = undefined;
let _authService = undefined;
let _userService = undefined;

export function init(render, router, authService, userService) {
    _render = render;
    _router = router;
    _authService = authService;
    _userService = userService;
}

export function loginView() {
    _render(loginTemplate(onSubmit));
}

async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try {
        if (email == '' || password == '') {
            throw new Error('All fields are required!');
        }

        const user = await _userService.login({ email, password });
        _authService.saveUser(user);
        _router.redirect('/');
    } catch (error) {
        return alert(error.message);
    }
}