import { deleteReq, get, post, put } from "./api.js";

const baseUrl = 'http://localhost:3030';

const url = {
    allItems: baseUrl+'/data/motorcycles?sortBy=_createdOn%20desc',
    login: baseUrl+'/users/login',
    register: baseUrl+'/users/register',
    logout: baseUrl+'/users/logout',
    create: baseUrl+'/data/motorcycles',
    getById: (id) => `${baseUrl}/data/motorcycles/${id}`,
    search: (query) => `${baseUrl}/data/motorcycles?where=model%20LIKE%20%22${query}%22`

}

export const getAllItems = () => get(url.allItems);
export const loginRequest = (loginData) => post(url.login, loginData);
export const registerRequest = (registerData) => post(url.register, registerData);
export const logoutRequest = () => get(url.logout);
export const createRequest = (itemData) => post(url.create, itemData);
export const getItemById = (itemId) => get(url.getById(itemId));
export const createEditRequest = (itemData, itemId) => put(url.getById(itemId), itemData);
export const createDeleteRequest = (itemId) => deleteReq(url.getById(itemId));
export const getSearchedItem = (query) => get(url.search(query))