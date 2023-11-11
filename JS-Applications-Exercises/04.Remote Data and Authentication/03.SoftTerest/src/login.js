import { loginRequest } from "./requests.js";

const loginPage = document.querySelector('#loginPage');
const loginForm = loginPage.querySelector('.form-user');

export function showLogin(context) {
    context.showSection(loginPage);
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let formData = new FormData(loginForm);
        
        let email = formData.get('email');
        let password = formData.get('password');
        
        let user = await loginRequest({email, password});
        localStorage.setItem('user', JSON.stringify(user));
        context.goTo('/');
        alert(`Welcome ${email}`);
    });
}