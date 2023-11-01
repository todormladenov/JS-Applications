window.addEventListener('load', () => {
    let loginFormElement = document.querySelector('form');
    loginFormElement.addEventListener('submit', login);

    function getFormData() {
        let formData = new FormData(loginFormElement);

        let email = formData.get('email');
        let password = formData.get('password');

        return {
            email,
            password
        }
    }

    async function login(e) {
        e.preventDefault();

        let loginData = getFormData();
        let url = 'http://localhost:3030/users/login';
        
        try {
            let response = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            let data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('username', data.email);

            window.location.pathname = '01.Cookbook%20part%202/index.html';
        } catch (error) {
            alert(error.message);
        }

    }

});