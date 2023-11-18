import { logoutRequest } from "./requests.js";

export async function logoutView(ctx) {
    await logoutRequest();
    localStorage.clear();
    ctx.page.redirect('/');
}
