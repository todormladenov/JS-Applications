import { get, post } from "./api.js";
import { removeUser, saveUser } from "./utils.js";

const baseUrl = 'http://localhost:3030/users';

export const login = async (email, password) => {
    const user = await post(baseUrl + '/login', { email, password });
    saveUser(user);

    return user;
}
export const register = async (email, password) => {
    const user = await post(baseUrl + '/register', { email, password });
    saveUser(user);

    return user;
}
export const logout = async (ctx) => {
    debugger
    await get(baseUrl + '/logout');
    removeUser();
    ctx.page.redirect('/');
}