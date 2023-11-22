import { get, post } from "./api.js";

const baseUrl = 'http://localhost:3030/users';

export const login = (userData) => post(baseUrl+'/login', userData);
export const register = (userData) => post(baseUrl+'/register', userData);
export const logout = () => get(baseUrl+'/logout');