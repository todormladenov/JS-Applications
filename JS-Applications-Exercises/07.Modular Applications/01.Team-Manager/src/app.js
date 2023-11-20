import page from "../node_modules/page/page.mjs";
import * as browsePage from "./pages/browse.js";
import * as createPage from "./pages/create.js";
import * as detailsPage from "./pages/details.js";
import * as editPage from "./pages/edit.js";
import * as homePage from "./pages/home.js";
import * as loginPage from "./pages/login.js";
import * as registerPage from "./pages/register.js";
import * as renderMIddleware from "./render/renderMIddleware.js";
import * as teamService from "./services/teamService.js";
import * as memberService from "./services/memberService.js";
import * as authService from "./services/authService.js";

homePage.initialize(page, renderMIddleware.generate);
loginPage.initialize(page, renderMIddleware.generate, authService);
registerPage.initialize(page, renderMIddleware.generate, authService);
createPage.initialize(page, renderMIddleware.generate, teamService);
editPage.initialize(page, renderMIddleware.generate, teamService);
browsePage.initialize(page, renderMIddleware.generate, teamService, memberService);
detailsPage.initialize(page, renderMIddleware.generate, teamService, memberService);

page(decorateContext);
page('/', homePage.homeView);
page('/login', loginPage.loginView);
page('/register', registerPage.registerView);
page('/logout', authService.logout);
page('/browse', browsePage.browseView);
page('/create', createPage.createView); 
page('/edit/:id', editPage.editView);
page('/details/:id', detailsPage.detailsView);

page.start();

function decorateContext(ctx, next) {
    ctx.user = authService.getUser;
    next()
}