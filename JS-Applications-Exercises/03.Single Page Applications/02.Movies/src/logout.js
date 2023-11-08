import { logoutRequest } from "./api.js";
import { showHome } from "./home.js";

export function logout(){
    logoutRequest();
    localStorage.clear();
    showHome();
}