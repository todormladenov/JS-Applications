import { deleteReq, get, post } from "./api.js";

const baseUrl = 'http://localhost:3030';
const loginUrl = `${baseUrl}/users/login`;
const registerUrl = `${baseUrl}/users/register`;
const logoutUrl = `${baseUrl}/users/logout`;
const getIdeasUrl = `${baseUrl}/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc`;
const ideasUrl = `${baseUrl}/data/ideas/`;

export const loginRequest = (loginData) => post(loginUrl, loginData);
export const registerRequest = (registerData) => post(registerUrl, registerData);
export const getAllIdeas = () => get(getIdeasUrl)
export const getIdeaById = (ideaId) => get(ideasUrl + ideaId);
export const deleteIdea = (ideaId) => deleteReq(ideasUrl + ideaId);
export const sendIdeaRequest = (data) => post(ideasUrl, data);
export const logoutRequest = () => get(logoutUrl);