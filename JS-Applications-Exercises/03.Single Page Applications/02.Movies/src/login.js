import { loginRequest } from "./api.js";
import { showHome } from "./home.js";

const containerElement = document.getElementById('container');
const loginSectionElement = document.getElementById('form-login');
const loginFormElement = loginSectionElement.querySelector('#login-form');

loginFormElement.addEventListener('submit', login);

export function showLogin() {
    containerElement.appendChild(loginSectionElement);
}

async function login(e) {
    e.preventDefault();
    let formData = new FormData(loginFormElement);

    let email = formData.get('email');
    let password = formData.get('password');
    let data = {
        email,
        password
    }

    let user = await loginRequest(data);
    localStorage.setItem('user', JSON.stringify(user));
    loginFormElement.reset();
    showHome();
}
