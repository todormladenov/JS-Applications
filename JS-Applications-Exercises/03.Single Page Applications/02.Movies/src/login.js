const containerElement = document.getElementById('container');
const loginSectionElement = document.getElementById('form-login');

export function showLogin(){
    containerElement.appendChild(loginSectionElement);
}
