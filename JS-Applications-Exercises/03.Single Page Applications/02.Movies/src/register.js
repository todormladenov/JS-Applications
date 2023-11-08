import { registerRequest } from "./api.js";
import { showHome } from "./home.js";

const containerElement = document.getElementById('container');
const registerSectionElement = document.getElementById('form-sign-up');
const registerFormElement = document.getElementById('register-form');
registerFormElement.addEventListener('submit', register);

export function showRegister(){
    containerElement.appendChild(registerSectionElement);
}

async function register(e){
    e.preventDefault();

    let formData = new FormData(registerFormElement);

    let email = formData.get('email');
    let password = formData.get('password');
    let repeatPassword = formData.get('repeatPassword');

    if (password != repeatPassword) {
        alert('Password must match Repeat Password');
    }

    let registerData = {
        email,
        password
    }

    let user = await registerRequest(registerData);

    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        registerFormElement.reset();
        showHome();
    }
}