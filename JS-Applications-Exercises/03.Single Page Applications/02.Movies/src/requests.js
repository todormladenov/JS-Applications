import { getUser } from "./auth.js";

async function request(method, url, data) {
    let options = {};
    let user = getUser();

    if (method != 'GET' && method != 'Delete') {
        options = {
            method,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    }

    if (user && method != 'GET' && method != 'Delete') {
        options.headers['X-Authorization'] = user.accessToken
    }

    try {
        let response = await fetch(url, options);
        if (response.status != 200) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let result = await response.json();
        return result;
    } catch (error) {
        alert(`Error: ${error.message}`)
    }

}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const deleteReq = request.bind(null, 'DELETE');