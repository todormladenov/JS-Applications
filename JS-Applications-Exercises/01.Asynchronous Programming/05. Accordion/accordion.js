function solution() {
    let mainElement = document.getElementById('main');

    async function getArticles() {
        let url = 'http://localhost:3030/jsonstore/advanced/articles/list';

        let response = await fetch(url);
        let articles = await response.json();

        return articles;
    }

    async function getArticlesById(id) {
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

        let response = await fetch(url);
        let details = await response.json();

        return details;
    }

    async function setArticles() {
        let articles = await getArticles();

        articles.forEach(article => {
            buildArticles(article);
        });
    }
    setArticles()

    async function buildArticles(article){
        let accordionElement = elementCreator('div', null, 'accordion', null, mainElement);
        let headElement = elementCreator('div', null, 'head', null, accordionElement)
        elementCreator('span', article.title, null, null, headElement);
        let btnElement = elementCreator('button', 'More', 'button', article._id, headElement);

        let extraInfo = await getArticlesById(article._id);

        let extraInfoElement = elementCreator('div', null, 'extra', null, accordionElement);
        extraInfoElement.style.display = 'none';
        elementCreator('p', extraInfo.content, null, null, extraInfoElement);

        btnElement.addEventListener('click', () => {
            if (extraInfoElement.style.display == 'none') {
                extraInfoElement.style.display = 'block';
                btnElement.textContent = 'Less';
            } else {
                extraInfoElement.style.display = 'none';
                btnElement.textContent = 'More';
            }
        });
    }

    function elementCreator(type, text, classStyle, id, parent) {
        let el = document.createElement(type);

        if (text) {
            el.textContent = text;
        }

        if (classStyle) {
            el.setAttribute('class', classStyle);
        }

        if (id) {
            el.setAttribute('id', id)
        }

        if (parent) {
            parent.appendChild(el);
        }

        return el;
    }
}
solution()