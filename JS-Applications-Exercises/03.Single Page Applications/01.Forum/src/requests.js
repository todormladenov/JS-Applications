const url = 'http://localhost:3030/jsonstore/collections/myboard/posts'

export async function sendPost(postInfo){
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(postInfo)
        })
        if (response.status != 200) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json();
        return data;
    } catch (error) {
        alert(`Error: ${error.message}`)
    }
}

export async function getAllPosts(){
    try {
        let response = await fetch(url)
        if (response.status != 200) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let data = await response.json();
        return Object.values(data);
    } catch (error) {
        alert(`Error: ${error.message}`)
    }
}