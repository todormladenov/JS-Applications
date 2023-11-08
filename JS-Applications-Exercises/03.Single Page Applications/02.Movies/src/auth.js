import { clearSections } from "./router.js";

const userElements = document.querySelectorAll('.user');
const guestElements = document.querySelectorAll('.guest');
const welcomeMsgElement = document.getElementById('welcome-msg');

export function getUser() {
    const userJsonString = localStorage.getItem('user');

    if (userJsonString) {
        return JSON.parse(userJsonString);
    }
}

export function authenticator() {
    const user = getUser();
    clearSections();
    if (user) {
        welcomeMsgElement.textContent = `Welcome ${user.email}`
        userElements.forEach(el => el.style.display = 'block');
        guestElements.forEach(el => el.style.display = 'none');
    } else {
        userElements.forEach(el => el.style.display = 'none');
        guestElements.forEach(el => el.style.display = 'block');
    }
}
