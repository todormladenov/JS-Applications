window.addEventListener('load', () => {
    let registerFormElement = document.querySelector('form');
    registerFormElement.addEventListener('submit', register);

    function getFormData() {
        let formData = new FormData(registerFormElement);
        let email = formData.get('email');
        let password = formData.get('password');
        let rePass = formData.get('rePass');

        if (password != rePass) {
            alert('Password must match with Repeat password!');
            return;
        }

        return {
            email,
            password
        }
    }

    async function register(e) {
        e.preventDefault();

        let formData = getFormData();

        if (!formData) {
            return;
        }

        let registerUrl = 'http://localhost:3030/users/register';

        try {
            let response = await fetch(registerUrl, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            let data = await response.json();

            if (!response.ok) {
                throw new Error(data.message)
            }

            console.log(data);
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('username', data.email)


            window.location.pathname = '01.Cookbook%20part%202/index.html';

        } catch (error) {
            alert(error.message)
        }
    }
})

