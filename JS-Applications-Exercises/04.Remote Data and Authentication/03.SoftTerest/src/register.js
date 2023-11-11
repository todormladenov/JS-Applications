import { registerRequest } from "./requests.js";

const registerPage = document.querySelector('#registerPage');
const registerForm = registerPage.querySelector('.form-user')

export function showRegister(context){
    context.showSection(registerPage);

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let formData = new FormData(registerForm);
        
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword')

        if (password != repeatPassword) {
            alert('Password must match Repeat Password');
            return;
        }
        
        let user = await registerRequest({email, password});
        localStorage.setItem('user', JSON.stringify(user));
        context.goTo('/');
        alert(`Welcome ${email}`);
    });
}