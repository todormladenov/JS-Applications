import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { logout } from "./logout.js";
import { showRegister } from "./register.js";

const sections = document.querySelectorAll('.view-section');
clearSections();

const routs = {
    '/': showHome,
    '/login': showLogin,
    '/register': showRegister,
    '/logout': logout
}

export function router(href) {
    clearSections();
    let rout = routs[href];
    rout();
}

function clearSections() {
    sections.forEach(section => section.remove());
}