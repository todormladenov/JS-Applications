import { logoutRequest } from "./requests.js";

export async function logout(ctx) {
  await logoutRequest();
  localStorage.clear();
  ctx.page.redirect('/');
}