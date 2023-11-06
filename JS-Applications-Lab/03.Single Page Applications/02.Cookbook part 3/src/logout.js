import { auth } from "./authentication.js";

export async function logout(){
    try {
        let response = await fetch('http://localhost:3030/users/logout');
        alert('Successfully logged out.');
        localStorage.clear();
        auth();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }

}