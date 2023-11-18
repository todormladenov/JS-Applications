import page from "../node_modules/page/page.mjs";
import { createView } from "./create.js";
import { detailsView } from "./details.js";
import { editView } from "./edit.js";
import { eventsView } from "./events.js";
import { viewHome } from "./home.js";
import { loginView } from "./login.js";
import { logoutView } from "./logout.js";
import { registerView } from "./register.js";
import { decorateContext } from "./renderMiddleware.js";

page(decorateContext);
page('/', viewHome);
page('/login', loginView);
page('/register', registerView);
page('/events', eventsView);
page('/logout', logoutView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

page.start();