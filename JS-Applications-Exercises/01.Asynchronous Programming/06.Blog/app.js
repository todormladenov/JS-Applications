function attachEvents() {
    let btnLoadPostsElement = document.getElementById('btnLoadPosts');
    let btnViewPostElement = document.getElementById('btnViewPost');
    let postsElement = document.getElementById('posts');
    let postTitleElement = document.getElementById('post-title');
    let postBodyElement = document.getElementById('post-body');
    let postCommentsElement = document.getElementById('post-comments');

    async function getPosts() {
        try {
            let url = 'http://localhost:3030/jsonstore/blog/posts/';

            let response = await fetch(url);
            if (response.status != 200) {
                throw new Error ('Posts not found');
            }
            let posts = await response.json();

            return Object.values(posts);
        } catch (error) {
            showError(error.message)
        }

    }

    async function getComments() {
        let url = `http://localhost:3030/jsonstore/blog/comments/`;

        let response = await fetch(url);
        let comments = await response.json();

        return Object.values(comments);
    }

    btnLoadPostsElement.addEventListener('click', loadPosts);
    btnViewPostElement.addEventListener('click', viewPost);

    async function loadPosts() {
        let posts = await getPosts();

        posts.forEach(post => {
            elementCreator('option', post.title, 'value', post.id, postsElement);
        });
    }

    async function viewPost() {
        let selectedPostId = postsElement.value

        if (selectedPostId == '') {
            return
        }

        let comments = await getComments();
        let posts = await getPosts();

        let foundComments = comments.filter(comment => comment.postId == selectedPostId);
        let foundPost = posts.filter(post => post.id == selectedPostId);
        debugger
        postTitleElement.textContent = foundPost[0].title;
        postBodyElement.textContent = foundPost[0].body;

        postCommentsElement.innerHTML = '';

        for (let comment of foundComments) {
            elementCreator('li', comment.text, 'id', comment.postId, postCommentsElement);
        }
    }

    function showError(message) {
        postTitleElement.textContent = `Error: ${message}`;
    }

    function elementCreator(type, text, attribute, value, parent) {
        let el = document.createElement(type);

        if (text) {
            el.textContent = text;
        }

        if (attribute) {
            el.setAttribute(attribute, value);
        }

        if (parent) {
            parent.appendChild(el);
        }

        return el;
    }
}
attachEvents();