async function lockedProfile() {
    let templateProfileElement = document.querySelector('.profile');
    let mainElement = document.getElementById('main');

    let url = 'http://localhost:3030/jsonstore/advanced/profiles';

    let response = await fetch(url);
    let profiles = await response.json();

    Object.entries(profiles).forEach(profile => {
        createProfile(profile);
    });

    function createProfile(profile) {
        let newProfile = templateProfileElement.cloneNode();
        newProfile.innerHTML = templateProfileElement.innerHTML;
        mainElement.appendChild(newProfile);

        let btnElement = newProfile.querySelector('button');
        let userInfoElements = newProfile.querySelectorAll('.profile input');
        let userDataElements = newProfile.querySelector('.user1Username');
        userDataElements.style.display = 'none';

        let [lockElement, unlockElement, usernameElement, emailElement, ageElement] = userInfoElements;
        lockElement.checked = true;
        usernameElement.value = profile[1].username;
        emailElement.value = profile[1].email;
        ageElement.value = profile[1].age;

        btnElement.addEventListener('click', () => {
            if (unlockElement.checked) {
                if (userDataElements.style.display == 'none') {
                    userDataElements.style.display = 'block';
                    btnElement.textContent = 'Hide it';
                } else {
                    userDataElements.style.display = 'none';
                    btnElement.textContent = 'Show more';
                }
            }
        });
    }
    templateProfileElement.remove();
}