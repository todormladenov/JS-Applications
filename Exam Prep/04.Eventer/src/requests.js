import { deleteReq, get, post, put } from "./api.js";

const baseUrl = 'http://localhost:3030';

const url = {
    allItems: baseUrl+'/data/events?sortBy=_createdOn%20desc',
    login: baseUrl+'/users/login',
    register: baseUrl+'/users/register',
    logout: baseUrl+'/users/logout',
    create: baseUrl+'/data/events',
    getById: (id) => `${baseUrl}/data/events/${id}`,
    sendGoing: baseUrl+'/data/going',
    allGoing: (id) => `${baseUrl}/data/going?where=eventId%3D%22${id}%22&distinct=_ownerId&count`,
    onwGoing: (id, userId) => `${baseUrl}/data/going?where=eventId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`

}

export const getAllEvents = () => get(url.allItems);
export const loginRequest = (loginData) => post(url.login, loginData);
export const registerRequest = (registerData) => post(url.register, registerData);
export const logoutRequest = () => get(url.logout);
export const createRequest = (evenData) => post(url.create, evenData);
export const getItemById = (evenId) => get(url.getById(evenId));
export const createEditRequest = (evenData, evenId) => put(url.getById(evenId), evenData);
export const createDeleteRequest = (evenId) => deleteReq(url.getById(evenId));
export const sendGoingRequest = (evenId) => post(url.sendGoing, evenId);
export const getAllGoing = (evenId) => get(url.allGoing(evenId));
export const getOwnGoing = async (evenId, user) => {
    if (!user) {
        return false
    }
    return await get(url.onwGoing(evenId, user._id));
}