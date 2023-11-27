import { deleteReq, get, post, put } from "./api.js";

const baseUrl = 'http://localhost:3030';

export const getMostRecentGames = () => get(baseUrl + '/data/games?sortBy=_createdOn%20desc&distinct=category');
export const getAllGames = () => get(baseUrl + '/data/games?sortBy=_createdOn%20desc');
export const createGame = (data) => post(baseUrl + '/data/games', data);
export const getGameById = (gameId) => get(baseUrl + `/data/games/${gameId}`);
export const deleteGame = (gameId) => deleteReq(baseUrl + `/data/games/${gameId}`);
export const updateGame = (gameId, data) => put(baseUrl + `/data/games/${gameId}`, data);