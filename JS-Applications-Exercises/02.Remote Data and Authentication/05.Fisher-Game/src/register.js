window.addEventListener('load', () => {
    let formElement = document.querySelector('form');
    let notificationElement = formElement.querySelector('.notification');
    formElement.addEventListener('submit', register);

    async function register(e) {
        e.preventDefault();
    
        let formData = getFormData();   
        let url = 'http://localhost:3030/users/register';

        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData)
        })
        let user = await response.json();

        if (!response.ok) {
            notificationElement.textContent = user.message;
            return;
        }

        localStorage.setItem(user, JSON.stringify(user));
        notificationElement.textContent = `Hello ${user.email} you have registered successful!`;

    }

    function getFormData() {
        let formData = new FormData(formElement);
        notificationElement.textContent = '';

        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('rePass');

        if (password != rePass) {
            notificationElement.textContent = 'Password must match repeatPassword.'
            return;
        }

        return {
            email,
            password,
        }
    }
});
