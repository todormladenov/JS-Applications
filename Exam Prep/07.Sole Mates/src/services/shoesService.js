import { deleteReq, get, post, put } from "./api.js";

const baseUrl = 'http://localhost:3030';

export const getAllShoes = () => get(baseUrl + '/data/shoes?sortBy=_createdOn%20desc');
export const getById = (id) => get(baseUrl + `/data/shoes/${id}`);

export const create = (brand, model, imageUrl, release, designer, value) =>
    post(baseUrl + '/data/shoes', { brand, model, imageUrl, release, designer, value });

export const update = (id, brand, model, imageUrl, release, designer, value) =>
    put(baseUrl + `/data/shoes/${id}`, { brand, model, imageUrl, release, designer, value });

export const removeShoe = (id) => deleteReq(baseUrl + `/data/shoes/${id}`);
export const search = (query) => get(baseUrl + `/data/shoes?where=brand%20LIKE%20%22${query}%22`);