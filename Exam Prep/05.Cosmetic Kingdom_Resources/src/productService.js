import { deleteReq, get, post, put } from "./api.js";

const baseUrl = 'http://localhost:3030';
const endpoints = {
    allProducts: baseUrl + '/data/products?sortBy=_createdOn%20desc',
    create: baseUrl + '/data/products',
    getById: (id) => baseUrl + '/data/products/' + id,
    buy: baseUrl + '/data/bought',
    allBought: (id) => `${baseUrl}/data/bought?where=productId%3D%22${id}%22&distinct=_ownerId&count`,
    onwBought: (productId, userId) => `${baseUrl}/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`

}

export const getAllProducts = () => get(endpoints.allProducts);
export const createProduct = (productData) => post(endpoints.create, productData);
export const getProductById = (id) => get(endpoints.getById(id));
export const deleteItem = (id) => deleteReq(endpoints.getById(id));
export const updateItem = (id, productData) => put(endpoints.getById(id), productData);
export const buyProduct = (data) => post(endpoints.buy, data);
export const bought = (id) => get(endpoints.allBought(id));
export const isBought = async (productId, user) => {
    if (!user) {
        return false
    }

    return await get(endpoints.onwBought(productId, user._id)) <= 0;
};