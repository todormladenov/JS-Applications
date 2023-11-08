import { get, post } from "./requests.js";

const baseUrl = 'http://localhost:3030';
const loginUrl = `${baseUrl}/users/login`;
const registerUrl = `${baseUrl}/users/register`;
const logoutUrl = `${baseUrl}/users/logout`;
const getMoviesUrl = `${baseUrl}/data/movies`;

export const loginRequest = (data) => post(loginUrl, data);
export const getAllMovies = () => get(getMoviesUrl);
export const registerRequest = (registerData) => post(registerUrl, registerData);