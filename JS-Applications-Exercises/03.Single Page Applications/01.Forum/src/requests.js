const url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
const commentsURL = 'http://localhost:3030/jsonstore/collections/myboard/comments';

export async function sendPost(postInfo) {
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

export async function sendComment(data){
    try {
        let response = await fetch(commentsURL, {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(data)
        })
        if (response.status != 200) {
            let error = await response.json();
            throw new Error(error.message);
        }
    
        let comment = await response.json();
        return comment;
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

export async function getAllCommentsById(){
    try {
        let response = await fetch(commentsURL);
        let comments = await response.json();
        return Object.values(comments);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

export async function getAllPosts() {
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

export async function getPostById(id) {
    try {
        let response = await fetch(`${url}/${id}`);
        let post = await response.json();
        if (response.status != 200) {
            let error = await response.json();
            throw new Error(error.message)
        }

        return post;
    } catch (error) {
        alert(`Error: ${error.message}`);
    }

}