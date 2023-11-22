import { deleteReq, get, post, put } from "./api.js";

const baseUrl = 'http://localhost:3030';

export const getAllAlbums = () => get(baseUrl + '/data/albums?sortBy=_createdOn%20desc');
export const createAlbum = (data) => post(baseUrl + '/data/albums', data);
export const getAlbumById = (id) => get(baseUrl + `/data/albums/${id}`);
export const updateAlbum = (data, id) => put(baseUrl + `/data/albums/${id}`, data);
export const deleteAlbum = (id) => deleteReq(baseUrl + `/data/albums/${id}`);
export const getAllAlbumLikes = (id) => get(baseUrl + `/data/likes?where=albumId%3D%22${id}%22&distinct=_ownerId&count`);
export const sendAlbumLike = (data) => post(baseUrl+'/data/likes', data)
export const getOwnAlbumLike = async (albumId, user) => {
    if (!user) {
        return false;
    }

    return await get(baseUrl+`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${user._id}%22&count`) <= 0;
}