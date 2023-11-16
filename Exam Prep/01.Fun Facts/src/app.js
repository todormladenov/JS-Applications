import page from "../node_modules/page/page.mjs";
import { createView } from "./create.js";
import { dashboardView } from "./dashboard.js";
import { detailsView } from "./details.js";
import { editView } from "./edit.js";
import { homeView } from "./home.js";
import { loginView } from "./login.js";
import { registerView } from "./register.js";
import { logoutRequest } from "./requests.js";

page(decorateContext);
page('/', homeView);
page('/create', createView);
page('/dashboard', dashboardView);
page('/login', loginView);
page('/register', registerView);
page('/details/:id', detailsView)
page('/edit/:id', editView)

page.start();

function decorateContext(ctx, next) {
    ctx.updateNavBar = () => updateNavBar();

    next();
}

function updateNavBar() {
    const userView = document.querySelector('.user');
    const guestView = document.querySelector('.guest');
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
        userView.style.display = 'inline';
        guestView.style.display = 'none';
    } else {
        userView.style.display = 'none';
        guestView.style.display = 'inline';
    }
}

document.getElementById('logout-btn').addEventListener('click', async () => {
    await logoutRequest();
    localStorage.clear();
    updateNavBar();
    page.redirect('/');
});