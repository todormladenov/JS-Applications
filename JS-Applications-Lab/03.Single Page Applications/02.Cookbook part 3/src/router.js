import { renderHome } from "./home.js";
import { renderLogin } from "./login.js";
import { renderRegister } from "./register.js";
import { renderCreate } from "./create.js";
import { logout } from "./logout.js";


const routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/create': renderCreate,
    '/logout': logout

}

export function router(path) {
    hideFields();

    const renderer = routes[path];
    renderer();
}

function hideFields() {
    const mainContent = document.querySelector('.main-content');

    for (const section of mainContent.children) {
        section.style.display = 'none';
    }
}