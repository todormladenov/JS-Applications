import page from "../node_modules/page/page.mjs";
import { viewCatalog } from "./catalog.js";
import { viewCreate } from "./create.js";
import { viewDetails } from "./details.js";
import { viewEdit } from "./edit.js";
import { viewHome } from "./home.js";
import { viewLogin } from "./login.js";
import { viewRegister } from "./register.js";
import { logoutRequest } from "./requests.js";
import { viewSearch } from "./search.js";

page(decorateContext);
page('/', viewHome);
page('/login', viewLogin);
page('/register', viewRegister);
page('/catalog', viewCatalog);
page('/create', viewCreate);
page('/search', viewSearch);
page('/details/:id', viewDetails);
page('/edit/:id', viewEdit);

page.start();

function decorateContext(ctx, next){
    ctx.updateNavBar = () => updateNavBar();
    next();
}

function updateNavBar(){
    const userView = document.querySelector('.user');
    const guestView = document.querySelector('.guest');
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
        userView.style.display = 'inline';
        guestView.style.display = 'none';
    } else{
        userView.style.display = 'none';
        guestView.style.display = 'inline';
    }
}

document.getElementById('logout-btn').addEventListener('click', async () => {
    await logoutRequest();
    localStorage.clear();
    page.redirect('/');
});