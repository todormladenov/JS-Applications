import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { logout } from "./logout.js";
import { showRegister } from "./register.js";

const sections = document.querySelectorAll('.view-section');

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

export function clearSections() {
    sections.forEach(section => section.remove());
}