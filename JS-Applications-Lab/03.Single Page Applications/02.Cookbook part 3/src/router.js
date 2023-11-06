import { renderHome } from "./home.js";
import { renderLogin } from "./login.js";
import { renderRegister } from "./register.js";
import { renderCreate } from "./create.js";


const routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/create': renderCreate

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