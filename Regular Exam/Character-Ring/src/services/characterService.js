import { deleteReq, get, post, put } from "./api.js";

const baseUrl = 'http://localhost:3030';

export const getAllCharacters = () => get(baseUrl + '/data/characters?sortBy=_createdOn%20desc');
export const getCharacterById = (charId) => get(baseUrl + `/data/characters/${charId}`);
export const createCharacter = (charData) => post(baseUrl + '/data/characters', charData);
export const updateCharacter = (charId, charData) => put(baseUrl + `/data/characters/${charId}`, charData);
export const deleteCharacter = (charId) => deleteReq(baseUrl + `/data/characters/${charId}`);