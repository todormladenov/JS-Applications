export const getUser = () => JSON.parse(localStorage.getItem('user'));
export const saveUser = (user) => localStorage.setItem('user', JSON.stringify(user));
export const removeUser = () => localStorage.clear();

export function createSubmitHandler(ctx, handler){
    return function (event){
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));

        handler(ctx, formData, event);
    }
}