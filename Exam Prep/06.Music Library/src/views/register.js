import { html } from "../../node_modules/lit-html/lit-html.js";

const registerTemplate = (onSubmit) => html`
<section id="register">
<div class="form">
    <h2>Register</h2>
    <form class="login-form" @submit=${onSubmit}>
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password" />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="#">Login</a></p>
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

export function registerView() {
    _render(registerTemplate(onSubmit));
}

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

        const user = await _userService.register({ email, password });
        _authService.saveUser(user);
        _router.redirect('/');
    } catch (error) {
        return alert(error.message);
    }
}