import { deleteReq, get, post, put } from "./api.js";

const baseUrl = 'http://localhost:3030/data/catalog';
const loginUrl = 'http://localhost:3030/users/login';
const logoutUrl = 'http://localhost:3030/users/logout';
const registerUrl = 'http://localhost:3030/users/register';

export const getAllFurniture = () => get(baseUrl);
export const getMyFurniture = (userId) => get(`${baseUrl}?where=_ownerId%3D%22${userId}%22`);
export const loginRequest = (loginData) => post(loginUrl, loginData);
export const registerRequest = (registerData) => post(registerUrl, registerData);
export const logoutRequest = () => get(logoutUrl)
export const createRequest = (furnitureData) => post(baseUrl, furnitureData);
export const getFurnitureById = (furnitureId) => get(`${baseUrl}/${furnitureId}`);
export const createEditRequest = (furnitureData, furnitureId) => put(`${baseUrl}/${furnitureId}`, furnitureData);
export const createDeleteRequest = (furnitureId) => deleteReq(`${baseUrl}/${furnitureId}`);
