const userElements = document.querySelectorAll('.user');
const guestElements = document.querySelectorAll('.guest');
const accessToken = getAuthToken();

export function getAuthToken(){
    const user = localStorage.getItem('user');

    if (user) {
        return user.accessToken;
    }
}

export function authenticator(){
    if (accessToken) {
        userElements.forEach(el => el.style.display = 'block');
        guestElements.forEach(el => el.style.display = 'none');
    } else {
        userElements.forEach(el => el.style.display = 'none');
        guestElements.forEach(el => el.style.display = 'block');
    }
}
