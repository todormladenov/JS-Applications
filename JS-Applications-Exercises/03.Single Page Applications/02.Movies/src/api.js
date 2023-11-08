import { get, post } from "./requests.js";

const baseUrl = 'http://localhost:3030';
const loginUrl = `${baseUrl}/users/login`;

export const loginRequest = (data) => post(loginUrl, data);
