import { get, post } from "./api.js";

const baseUrl = 'http://localhost:3030';

export const getAllComments = (gameId) => get(baseUrl + `/data/comments?where=gameId%3D%22${gameId}%22`);
export const createComment = (gameId, comment) => post(baseUrl + '/data/comments', { gameId, comment });
