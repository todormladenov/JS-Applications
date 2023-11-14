async function request(method, url, data) {
    let options = {
        method,
        headers: {},
    };

    if (data) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        let response = await fetch(url, options);
        if (!response.ok) {
            if (response.status == 403) {
                localStorage.clear();
            }
            let error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        }

        let result = await response.json();
        return result;
    } catch (error) {
        alert(`Error: ${error.message}`)
        throw error;
    }

}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const deleteReq = request.bind(null, 'DELETE');