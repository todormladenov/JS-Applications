import { deleteReq, get, post, put } from "./api.js";

const baseUrl = 'http://localhost:3030';

export const getAll = () => get(baseUrl + '/data/offers?sortBy=_createdOn%20desc');
export const getById = (id) => get(baseUrl + `/data/offers/${id}`);
export const create = (title, imageUrl, category, description, requirements, salary) =>
post(baseUrl + '/data/offers', { title, imageUrl, category, description, requirements, salary });
export const update = (id, title, imageUrl, category, description, requirements, salary) =>
put(baseUrl + `/data/offers/${id}`, { title, imageUrl, category, description, requirements, salary });
export const remove = (id) => deleteReq(baseUrl + `/data/offers/${id}`);
export const getApplications = (id) => get(baseUrl + `/data/applications?where=jobId%3D%22${id}%22&distinct=_ownerId&count`);
export const apply = (offerId) => post(baseUrl + '/data/applications', offerId);
export const getOwnApply = async (offerId, user) => {
    if (!user) {
        return false;
    }   

    return await get(baseUrl + `/data/applications?where=jobId%3D%22${offerId}%22%20and%20_ownerId%3D%22${user._id}%22&count`) <= 0;
}