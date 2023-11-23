import page from "../node_modules/page/page.mjs";
import { renderContext } from "./middleware/render.js";
import { logout } from "./services/userService.js";
import { getUser } from "./services/utils.js";
import { catalogView } from "./views/catalog.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { searchView } from "./views/search.js";

page(decorateContext);
page(renderContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logout);
page('/catalog', catalogView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/search', searchView);

page.start();

function decorateContext(ctx, next) {
    ctx.user = getUser();

    next();
}