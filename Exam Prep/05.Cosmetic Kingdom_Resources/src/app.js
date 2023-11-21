import page from "../node_modules/page/page.mjs";
import * as authService from "./authService.js";
import * as productService from "./productService.js";
import * as homePage from "./home.js";
import * as loginPage from "./login.js";
import * as registerPage from "./register.js";
import * as catalogPage from "./catalog.js";
import * as createPage from "./create.js";
import * as detailsPage from "./details.js";
import * as editPage from "./edit.js";
import * as render from "./renderMiddleware.js";

authService.init(page);   
homePage.init(render.generate);
loginPage.init(render.generate, page, authService);
registerPage.init(render.generate, page, authService);
catalogPage.init(render.generate, page, productService);
createPage.init(render.generate, page, productService);
detailsPage.init(render.generate, page, productService);
editPage.init(render.generate, page, productService);

page(decorateContext);
page('/', homePage.homeView);
page('/login', loginPage.loginView);
page('/register', registerPage.registerView);
page('/catalog', catalogPage.catalogView);
page('/create', createPage.createView);
page('/details/:id', detailsPage.detailsView);
page('/edit/:id', editPage.editView);

page.start();

function decorateContext(ctx, next){
    ctx.user = authService.getUser;
    next();
}