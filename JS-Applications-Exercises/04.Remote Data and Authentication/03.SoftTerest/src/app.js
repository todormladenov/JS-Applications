import { showCatalog } from "./catalog.js";
import { showCreate } from "./create.js";
import { showDetails } from "./details.js";
import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { logoutRequest } from "./requests.js";
import { initialize } from "./router.js";

document.querySelector('#views').remove();

const links = {
    '/': showHome,
    '/register': showRegister,
    '/login': showLogin,
    '/catalog': showCatalog,
    '/details': showDetails,
    '/create': showCreate,
    '/logout': logout
}

const router = initialize(links);
router.goTo('/');
router.showNavigationView();

function logout(){
    logoutRequest();
    localStorage.clear();
    router.goTo('/');
}