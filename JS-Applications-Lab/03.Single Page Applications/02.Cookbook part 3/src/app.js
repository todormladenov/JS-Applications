import { router } from "./router.js";

const guestElement = document.getElementById('guest');
const userElement = document.getElementById('user');
const navigationElement = document.querySelector('.navigation');

const accessToken = localStorage.getItem('accessToken');

if (accessToken) {
    guestElement.style.display = 'none';
    userElement.style.display = 'inline';
} else {
    guestElement.style.display = 'inline';
    userElement.style.display = 'none';
}


navigationElement.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.tagName == 'A') {
        let url = new URL(e.target.href);

        document.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');

        router(url.pathname);
    }
});