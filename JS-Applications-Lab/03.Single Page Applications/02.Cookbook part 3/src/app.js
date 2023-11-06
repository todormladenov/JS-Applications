import { router } from "./router.js";

const guestElement = document.getElementById('guest');
const userElement = document.getElementById('user');
const navigationElement = document.querySelector('.navigation');
guestElement.style.display = 'inline';
userElement.style.display = 'inline';

navigationElement.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (e.target.tagName == 'A') {
        let url = new URL(e.target.href);
        router(url.pathname);
    }
});