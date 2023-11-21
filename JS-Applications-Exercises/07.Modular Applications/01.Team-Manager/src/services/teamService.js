import { deleteReq, get, post, put } from "../api.js";
import { encodeQuery } from "../helpers/queryEncoder.js";

const baseUrl = 'http://localhost:3030';

const url = {
    allItems: baseUrl + '/data/teams',
    create: baseUrl + '/data/teams',
    getById: (id) => `${baseUrl}/data/teams/${id}`,
    allTeamsForUser: (query) => `${baseUrl}/data/members?${query}`
}

export const getAllItems = async () => await get(url.allItems);
export const createRequest = (itemData) => post(url.create, itemData);
export const getItemById = (itemId) => get(url.getById(itemId));
export const createEditRequest = (itemData, itemId) => put(url.getById(itemId), itemData);
export const createDeleteRequest = (itemId) => deleteReq(url.getById(itemId));
export const allTeamsForOneMember = (userId) => {
    const queryObject = {
        where: `_ownerId="${userId}" AND status="member"`,
        load: `team=teamId:teams`
    }

    const query = encodeQuery(queryObject);
    return get(url.allTeamsForUser(query));
}