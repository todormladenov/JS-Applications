import { get, post } from "../api.js";

const baseUrl = 'http://localhost:3030';

const url = {
    login: baseUrl + '/users/login',
    register: baseUrl + '/users/register',
    logout: baseUrl + '/users/logout'
}

export const loginRequest = (loginData) => post(url.login, loginData);
export const registerRequest = (registerData) => post(url.register, registerData);

export function getUser(){
    return JSON.parse(localStorage.getItem('user'));
}

export async function logout(ctx){
    await get(url.logout);
    localStorage.clear();
    ctx.page.redirect('/');
}