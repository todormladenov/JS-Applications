import { deleteReq, get, post, put } from "./requests.js";

const baseUrl = 'http://localhost:3030';
const loginUrl = `${baseUrl}/users/login`;
const registerUrl = `${baseUrl}/users/register`;
const logoutUrl = `${baseUrl}/users/logout`;
const moviesUrl = `${baseUrl}/data/movies`;
const likeUrl = `${baseUrl}/data/likes`;

export const loginRequest = (data) => post(loginUrl, data);
export const getAllMovies = () => get(moviesUrl);
export const registerRequest = (registerData) => post(registerUrl, registerData);
export const logoutRequest = () => get(logoutUrl);
export const addMovieRequest = (addMovieData) => post(moviesUrl, addMovieData);
export const getMovieById = (movieId) => get(`${moviesUrl}/${movieId}`);
export const deleteMovieRequest = (movieId) => deleteReq(`${moviesUrl}/${movieId}`);
export const editMovieRequest = (movieId) => put(`${moviesUrl}/${movieId}`);
export const getLikes = (movieId) => get(`${baseUrl}/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`);
export const likeMovie = (movieId) => post(likeUrl, {movieId});