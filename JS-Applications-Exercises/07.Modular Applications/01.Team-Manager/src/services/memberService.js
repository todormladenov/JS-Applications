import { deleteReq, get, post, put } from "../api.js";
import { encodeQuery } from "../helpers/queryEncoder.js";

const baseUrl = 'http://localhost:3030/data/members';

const url = {
    allMembers: `${baseUrl}?where=status%3D%22member%22`,
    allTeamMembers: (query) => `${baseUrl}?${query}`,
    selectById: (id) => `${baseUrl}/${id}`,
    allTeamPending: (query) => `${baseUrl}?${query}`
}

export const getAllMembers = async () => await get(url.allMembers);
export const getTeamMembers = (teamId) => {
    const queryObject = {
        where: `teamId="${teamId}"`,
        load: `user=_ownerId:users`
    }
    const query = encodeQuery(queryObject);
    return get(url.allTeamMembers(query));
};
export const deleteRequest = (id) => deleteReq(url.selectById(id));
export const getAllPending = (teamId) => {
    const queryObject = {
        where: `teamId="${teamId}"`,
        where: `status="pending"`,
        load: `user=_ownerId:users`
    }

    const query = encodeQuery(queryObject);
    return get(url.allTeamPending(query));
};
export const approve = (id, data) => put(url.selectById(id), data)
export const joinTeam = (data) => post(baseUrl, data);

