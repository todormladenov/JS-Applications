import page from "../node_modules/page/page.mjs";
import { renderContext } from "./middlewares/render.js";
import { logout } from "./services/userService.js";
import { userContext } from "./services/utils.js";
import { createView } from "./views/create.js";
import { dashboardView } from "./views/dashboard.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";

page(userContext);
page(renderContext);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logout);
page('/dashboard', dashboardView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

page.start();