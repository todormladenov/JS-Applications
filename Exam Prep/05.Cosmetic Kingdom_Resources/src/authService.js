import { get, post } from "./api.js";

const baseUrl = 'http://localhost:3030';
const endpoints = {
    loginUrl: baseUrl + '/users/login',
    registerUrl: baseUrl + '/users/register',
    logoutUrl: baseUrl + '/users/logout',
}

export function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

let _router = undefined;

export function init(router) {
    _router = router;
}

export const login = (loginData) => post(endpoints.loginUrl, loginData);
export const register = (registerData) => post(endpoints.registerUrl, registerData);
export async function logout(){
    await get(endpoints.logoutUrl);
    localStorage.clear();
    _router.redirect('/');
}