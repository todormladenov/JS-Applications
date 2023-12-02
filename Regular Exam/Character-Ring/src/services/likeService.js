import { get, post } from "./api.js";

const baseUrl = 'http://localhost:3030';

export const getCharacterLikes = (characterId) => get(baseUrl + `/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`);
export const sendLike = (characterId) => post(baseUrl + '/data/useful', characterId);
export const getOwnLike = async (characterId, user) => {
    if (!user) {
        return false;
    }

    return await get(baseUrl + `/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${user._id}%22&count`) <= 0;
}