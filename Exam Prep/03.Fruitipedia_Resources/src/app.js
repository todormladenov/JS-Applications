import page from "../node_modules/page/page.mjs";
import { decorateContext } from "./renderMiddleware.js";
import { viewCatalog } from "./catalog.js";
import { viewCreate } from "./create.js";
import { viewHome } from "./home.js";
import { viewLogin } from "./login.js";
import { viewRegister } from "./register.js";
import { logout } from "./logout.js";
import { viewDetails } from "./details.js";
import { viewEdit } from "./edit.js";
import { viewSearch } from "./search.js";

page(decorateContext);
page('/', viewHome);
page('/login', viewLogin);
page('/logout', logout);
page('/register', viewRegister);
page('/create', viewCreate);
page('/catalog', viewCatalog);
page('/details/:id', viewDetails);
page('/edit/:id', viewEdit);
page('/search', viewSearch);

page.start();