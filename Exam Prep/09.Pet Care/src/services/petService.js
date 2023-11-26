import { deleteReq, get, post, put } from "./api.js";

const baseUrl = 'http://localhost:3030';

export const getAllPets = () => get(baseUrl + '/data/pets?sortBy=_createdOn%20desc&distinct=name');
export const getPetById = (petId) => get(baseUrl + `/data/pets/${petId}`);
export const createPet = (petData) => post(baseUrl + '/data/pets', petData);
export const updatePet = (petId, petData) => put(baseUrl + `/data/pets/${petId}`, petData);
export const removePet = (petId) => deleteReq(baseUrl + `/data/pets/${petId}`);
export const getDonations = (petId) => get(baseUrl + `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
export const sendDonation = (petId) => post(baseUrl + '/data/donation', petId);
export const getOwnDonation = async (petId, user) => {
    if (!user) {
        return false
    }

    return await get(baseUrl + `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${user._id}%22&count`) <= 0;
}