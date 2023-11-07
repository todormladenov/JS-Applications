const topicContentElement = document.querySelector('.topic-title');
const commentElement = document.querySelector('.comment');
const detailsViewElement = document.querySelector('.details-view');
const formElement = document.querySelector('.answer-comment');

export function generateTopicElement(topicData) {
    let div = document.createElement('div');
    div.classList.add('topic-container');

    div.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
        <h2 data-id=${topicData._id}>${topicData.topicName}</h2>
            <a href="#" class="normal"></a>
            <div class="columns">
                <div>
                    <p>Date: <time>${new Date(topicData.date).toISOString()}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${topicData.username}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    
    topicContentElement.appendChild(div);
    return div;
}

export function generateTopicDetails(data) {
    let div = document.createElement('div');
    div.classList.add('header');
    div.innerHTML = `
        <div class="theme-title">
            <div class="theme-name-wrapper">
                <div class="theme-name">
                        <h2>${data.topicName}</h2>
                </div>
            </div>
        </div>
        <img src="./static/profile.png" alt="avatar">
        <p><span>${data.username}</span> posted on <time>${new Date(data.date).toISOString()}</time></p>

        <p class="post-content">${data.postText}</p>
    `   
    commentElement.innerHTML = '';
    commentElement.appendChild(div);
    return div;
}

export function renderFormElement() {
    formElement.style.display = 'block';
}

export function generateTopicComment(comment) {
    let div = document.createElement('div');
    div.setAttribute('id','user-comment');

    let date = new Date(comment.date);
    let dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    div.innerHTML = `
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <p><strong>${comment.username}</strong> commented on <time>${dateStr}</time></p>
                    <div class="post-content">
                    <p>${comment.postText}</p>
                    </div>
            </div>
        </div>
    `;
    commentElement.appendChild(div);

}