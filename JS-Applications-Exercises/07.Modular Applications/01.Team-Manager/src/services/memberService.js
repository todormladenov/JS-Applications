import { deleteReq, get, post, put } from "../api.js";
import { encodeQuery } from "../helpers/queryEncoder.js";

const baseUrl = 'http://localhost:3030/data/members';

const url = {
    allMembers: (query) => `${baseUrl}?${query}`,
    allTeamMembers: (query) => `${baseUrl}?${query}`,
    selectById: (id) => `${baseUrl}/${id}`,
    allTeamPending: (query) => `${baseUrl}?${query}`
}

export const getAllMembers = () => {
    const queryObject = {
        where: `status="member"`
    }

    const query = encodeQuery(queryObject);
    return get(url.allMembers(query));
};
export const getTeamMembers = (teamId) => {
    const queryObject = {
        where: `teamId="${teamId}"`,
        load: `user=_ownerId:users`
    }
    const query = encodeQuery(queryObject);
    return get(url.allTeamMembers(query));
};
export const deleteRequest = (id) => deleteReq(url.selectById(id));
export const approve = (id, data) => put(url.selectById(id), data)
export const joinTeam = (data) => post(baseUrl, data);

