const loginSectionElement = document.querySelector('.login');
const loginFormElement = loginSectionElement.querySelector('form');

loginFormElement.addEventListener('submit', login);

export function renderLogin() {
    loginSectionElement.style.display = 'block';
}

async function login(e) {
    e.preventDefault();

    let formData = new FormData(loginFormElement);

    let email = formData.get('email');
    let password = formData.get('password');

    let response = await fetch('http://localhost:3030/users/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    let user = await response.json();
    
    localStorage.setItem('email', user.email);
    localStorage.setItem('username', user.username);
    localStorage.setItem('accessToken', user.accessToken);
    localStorage.setItem('_id', user._id);

    alert('Successfully logged in.')
}