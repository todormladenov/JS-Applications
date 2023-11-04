window.addEventListener('load', () => {
    let formElement = document.querySelector('form');
    let notificationElement = formElement.querySelector('.notification');
    formElement.addEventListener('submit', login);

    async function login(e) {
        e.preventDefault();
        
        let url = 'http://localhost:3030/users/login';
        let formData = getFormData();

        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData)
        });

        let user = await response.json();

        if (!response.ok) {
            notificationElement.textContent = user.message;
            return;
        }

        localStorage.setItem('user', JSON.stringify(user));
    }

    function getFormData() {
        let formData = new FormData(formElement);
        notificationElement.textContent = '';

        let email = formData.get('email');
        let password = formData.get('password');

        return {
            email,
            password,
        }
    }
});