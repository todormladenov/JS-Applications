const guestElement = document.getElementById('guest');
const userElement = document.getElementById('user');

export function auth() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        guestElement.style.display = 'none';
        userElement.style.display = 'inline';
    } else {
        guestElement.style.display = 'inline';
        userElement.style.display = 'none';
    }
}