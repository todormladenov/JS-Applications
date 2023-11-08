import { showHome } from "./home.js";

export function logout(){
    localStorage.clear();
    showHome();
}