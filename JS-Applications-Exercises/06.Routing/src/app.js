import page from "../node_modules/page/page.mjs";
import { showCreate } from "./create.js";
import { showDetails } from "./details.js";
import { showEdit } from "./edit.js";
import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showMyFurniture } from "./myFurniture.js";
import { showRegister } from "./register.js";
import { logoutRequest } from "./requests.js";
updateNav();

page(decorateContext);
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);
page('/my-furniture', showMyFurniture);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);

page.start();

function decorateContext(cxt, next) {
    cxt.updateNav = () => updateNav();

    next();
}

function updateNav() {
    const user = JSON.parse(localStorage.getItem('user'));
    const guestView = document.getElementById('guest');
    const userView = document.getElementById('user');
    if (user) {
        userView.style.display = 'inline';
        guestView.style.display = 'none';
    } else {
        guestView.style.display = 'inline';
        userView.style.display = 'none';
    }
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logoutRequest();
    localStorage.clear();
    updateNav();
    page.redirect('/');
});