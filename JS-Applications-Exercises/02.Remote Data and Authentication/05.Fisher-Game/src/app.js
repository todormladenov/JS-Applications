window.addEventListener('load', () => {
    let userInfo = localStorage.getItem('user');
    userInfo = JSON.parse(userInfo);

    let userElement = document.getElementById('user');
    let guestElement = document.getElementById('guest');
    let logoutElement = document.getElementById('logout'); 
    let welcomeMessageElement = document.querySelector('.email span');
    
    if (userInfo.accessToken) {
        userElement.style.display = 'inline';
        guestElement.style.display = 'none';
        welcomeMessageElement.textContent = userInfo.email;
    } else {
        userElement.style.display = 'none';
        guestElement.style.display = 'inline';
    }

    logoutElement.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    })
});