import { deleteReq, get, post, put } from "./api.js";

const baseUrl = 'http://localhost:3030';

const url = {
    allItems: baseUrl+'/data/facts?sortBy=_createdOn%20desc',
    login: baseUrl+'/users/login',
    register: baseUrl+'/users/register',
    logout: baseUrl+'/users/logout',
    create: baseUrl+'/data/facts',
    getById: (id) => `${baseUrl}/data/facts/${id}`,
    sendLike: baseUrl+'/data/likes',
    allLikes: (factId) => `${baseUrl}/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`,
    onwLike: (factId, userId) => `${baseUrl}/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}

export const getAllFacts = () => get(url.allItems);
export const loginRequest = (loginData) => post(url.login, loginData);
export const registerRequest = (registerData) => post(url.register, registerData);
export const logoutRequest = () => get(url.logout);
export const createRequest = (factData) => post(url.create, factData);
export const getItemById = (factId) => get(url.getById(factId));
export const createEditRequest = (factData, factId) => put(url.getById(factId), factData);
export const createDeleteRequest = (factId) => deleteReq(url.getById(factId));
export const sendLikeRequest = (factId) => post(url.sendLike, factId);
export const getAllLikes = (factId) => get(url.allLikes(factId));
export const getOwnLike = async (factId, user) => {
    if (!user) {
        return false
    }
    return get(url.onwLike(factId, user._id));
}