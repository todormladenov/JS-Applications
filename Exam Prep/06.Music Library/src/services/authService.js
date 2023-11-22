export const getUser = () => JSON.parse(localStorage.getItem('user'));
export const saveUser = (user) => localStorage.setItem('user', JSON.stringify(user));
export const removeUser = () => localStorage.clear();