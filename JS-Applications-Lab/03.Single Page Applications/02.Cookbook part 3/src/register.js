import { auth } from "./authentication.js";

const registerSectionElement = document.querySelector('.register');
const registerFormElement = registerSectionElement.querySelector('form');
registerFormElement.addEventListener('submit', register);

export function renderRegister() {
    registerSectionElement.style.display = 'block';
}

async function register(e) {
    e.preventDefault();

    let formData = new FormData(registerFormElement);

    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('rePass');

    if (password != rePass) {
        alert('Password must match repeat');
        return;
    }

    try {
        let response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (response.status != 200) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let user = await response.json();
        localStorage.setItem('email', user.email);
        localStorage.setItem('accessToken', user.accessToken);
        localStorage.setItem('_id', user._id);

        alert('Successfully registered.');
        registerFormElement.reset();
        auth();

    } catch (error) {
        alert(`Error: ${error.message}`);
    }

}

