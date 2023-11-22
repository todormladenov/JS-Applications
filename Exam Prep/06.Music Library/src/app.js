import page from "../node_modules/page/page.mjs";
import * as navBar from "./views/navBar.js";
import * as homePage from "./views/home.js";
import * as loginPage from "./views/login.js";
import * as registerPage from "./views/register.js";
import * as logoutPage from "./views/logout.js";
import * as dashboardPage from "./views/dashboard.js";
import * as createPage from "./views/create.js";
import * as detailsPage from "./views/details.js";
import * as editPage from "./views/edit.js";
import * as authService from "./services/authService.js";
import * as userService from "./services/userService.js";
import * as albumService from "./services/albumService.js";
import { generate } from "./render/renderMiddleware.js";

navBar.init(authService);
homePage.init(generate);
loginPage.init(generate, page, authService, userService);
registerPage.init(generate, page, authService, userService);
logoutPage.init(page, authService, userService);
dashboardPage.init(generate, page, authService, albumService);
createPage.init(generate, page, albumService);
detailsPage.init(generate, page, authService, albumService);
editPage.init(generate, page, albumService);

page('/', homePage.homeView);
page('/login', loginPage.loginView);
page('/register', registerPage.registerView);
page('/logout', logoutPage.logoutView);
page('/dashboard', dashboardPage.dashboardView);
page('/add-album', createPage.createView);
page('/details/:id', detailsPage.detailsView);
page('/edit/:id', editPage.editView);

page.start()