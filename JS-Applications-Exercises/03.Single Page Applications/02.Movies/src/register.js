const containerElement = document.getElementById('container');
const registerSectionElement = document.getElementById('form-sign-up');

export function showRegister(){
    containerElement.appendChild(registerSectionElement);
}