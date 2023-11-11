import { getUser } from "./auth.js";

export function initialize(links) {
    const main = document.querySelector('main');
    document.querySelector('.navbar').addEventListener('click', navigator);

    const context = {
        showSection,
        goTo,
        showNavigationView
    }

    return context;

    function navigator(e) {
        e.preventDefault();

        let target = e.target;
        if (target.tagName == 'IMG') {
            target = target.parentElement;
        }

        if (target.tagName == 'A') {
            const url = new URL(target.href);
            const pathname = url.pathname;
            goTo(pathname);
        }
    }

    function showNavigationView(){
        const user = getUser();
        const userView = document.querySelectorAll('.user');
        const guestView = document.querySelectorAll('.guest');
        
        if (user) {
            userView.forEach(el => el.style.display = 'inline');    
            guestView.forEach(el => el.style.display = 'none');    
        } else {
            userView.forEach(el => el.style.display = 'none');    
            guestView.forEach(el => el.style.display = 'inline');  
        }
    }

    function goTo(pathname, id) {
        const handler = links[pathname];
        if (typeof handler == 'function') {
            handler(context, id);
        }
    }

    function showSection(element) {
        showNavigationView();
        main.replaceChildren(element);
    }
}