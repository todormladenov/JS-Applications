const topicContentElement = document.querySelector('.topic-title');

export function generateTopicElement(topicData) {
    let div = document.createElement('div');
    div.classList.add('topic-container');

    div.innerHTML = `
    <div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="#" class="normal" data-id=${topicData._id}>
                <h2>${topicData.topicName}</h2>
            </a>
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