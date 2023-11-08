import { getUser } from "./auth.js";

async function request(method, url, data){
    let options = {};
    let user = getUser()

    if (method != 'GET' && method != 'Delete') {
        options = {
            method,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    }

    if (user) {
        options.headers['X-Authorization'] = user.accessToken
    }

    let response = await fetch(url, options);
    let result = await response.json();
    return result;
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const deleteReq = request.bind(null, 'DELETE');