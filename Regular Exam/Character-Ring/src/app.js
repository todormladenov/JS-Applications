import page from "../node_modules/page/page.mjs";
import { renderContext } from "./middleware/render.js";
import { logout } from "./services/userService.js";
import { userContext } from "./services/utils.js";
import { charactersView } from "./view/characters.js";
import { createView } from "./view/create.js";
import { detailsView } from "./view/details.js";
import { editView } from "./view/edit.js";
import { homeView } from "./view/home.js";
import { loginView } from "./view/login.js";
import { registerView } from "./view/register.js";

page(userContext);
page(renderContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logout);
page('/characters', charactersView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

page.start();