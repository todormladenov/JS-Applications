import { router } from "./router.js";
import { auth } from "./authentication.js";

auth();
const navigationElement = document.querySelector('.navigation');

navigationElement.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.tagName == 'A') {
        let url = new URL(e.target.href);

        document.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');

        router(url.pathname);
    }
});