async function getRecipes() {
    let response = await fetch('http://localhost:3030/data/recipes');
    let recipes = await response.json();

    return Object.values(recipes);
}

async function getRecipeById(id) {
    let response = await fetch(`http://localhost:3030/data/recipes/${id}`);
    let recipeInfo = await response.json();

    return recipeInfo;
}

window.addEventListener('load', async () => {
    let main = document.querySelector('main');
    let guestElement = document.getElementById('guest');
    let userElement = document.getElementById('user');
    let logoutBtnElement = document.getElementById('logoutBtn');

    if (!localStorage.accessToken) {
        guestElement.style.display = 'inline-block';
    } else {
        userElement.style.display = 'inline-block';
    }

    logoutBtnElement.addEventListener('click', logout);

    main.innerHTML = '';
    let recipes = await getRecipes();

    recipes.forEach(recipe => {
        let recipeElement = createRecipe(recipe);
        let id = recipe._id;

        recipeElement.addEventListener('click', async () => {
            let recipeDetails = await addDetails(id);
            recipeElement.replaceWith(recipeDetails);
        });
    });
});

function logout(){
    localStorage.clear();
    window.location.reload();
}

function createRecipe(recipe) {
    let main = document.querySelector('main');

    let articleElement = elementCreator('article', null, null, 'preview', main);
    let divTitleElement = elementCreator('div', null, null, 'title', articleElement);
    let divSmallElement = elementCreator('div', null, null, 'small', articleElement);

    elementCreator('h2', recipe.name, null, null, divTitleElement);
    elementCreator('img', null, recipe.img, null, divSmallElement);

    return articleElement;
}

async function addDetails(id) {
    let recipeInfo = await getRecipeById(id);

    let articleElement = elementCreator('article', null, null, null, null);
    elementCreator('h2', recipeInfo.name, null, null, articleElement);

    let divBandElement = elementCreator('div', null, null, 'band', articleElement);
    let divThumbElement = elementCreator('div', null, null, 'thumb', divBandElement);
    elementCreator('img', null, recipeInfo.img, null, divThumbElement);

    let divIngredientsElement = elementCreator('div', null, null, 'ingredients', divBandElement);
    elementCreator('h3', 'Ingredients:', null, null, divIngredientsElement);

    let ulIngredientsElement = elementCreator('ul', null, null, null, divIngredientsElement);
    recipeInfo.ingredients.forEach(ing => elementCreator('li', ing, null, null, ulIngredientsElement));

    let divDescriptionElement = elementCreator('div', null, null, 'description', articleElement);
    elementCreator('h3', 'Preparation:', null, null, divDescriptionElement);

    recipeInfo.steps.forEach(step => elementCreator('p', step, null, null, divDescriptionElement))

    return articleElement;
}

function elementCreator(type, text, src, classStyle, parent) {
    let el = document.createElement(type);

    if (text) {
        el.textContent = text;
    }

    if (src) {
        el.src = src
    }

    if (classStyle) {
        el.setAttribute('class', classStyle);
    }

    if (parent) {
        parent.appendChild(el);
    }

    return el;
}