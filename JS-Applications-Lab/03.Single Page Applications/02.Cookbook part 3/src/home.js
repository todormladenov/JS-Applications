import { addDetails } from "./showMore.js";

const url = 'http://localhost:3030/data/recipes'
const homeSection = document.querySelector('.home');

export async function renderHome() {
    let response = await fetch(url);
    let recipes = await response.json();
    
    homeSection.innerHTML = '';
    recipes.forEach(recipe => {
        let recipeElement = showRecipes(recipe);
        let detailsRecipeElement = addDetails(recipe);
        
        recipeElement.addEventListener('click', () => {
            homeSection.replaceChildren(detailsRecipeElement);
        });
    });
    
    homeSection.style.display = 'block';
}

function showRecipes(recipe) {
    const recipeElement = document.createElement('article');
    recipeElement.classList.add('preview');
    recipeElement.innerHTML = ` 
                <div class="title">
                    <h2>${recipe.name}</h2>
                </div>
                <div class="small">
                    <img src="${recipe.img}">
                </div>`;

    homeSection.appendChild(recipeElement);

    return recipeElement;
}