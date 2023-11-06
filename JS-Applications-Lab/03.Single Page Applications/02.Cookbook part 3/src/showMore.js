export function addDetails(recipe) {
    let recipeElement = document.createElement('article');
    
    recipeElement.innerHTML = `
    <h2>${recipe.name}</h2>
    <div class="band">
        <div class="thumb">
            <img src="${recipe.img}">
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${recipe.ingredients.map(x => `<li>${x}</li>`).join('')}
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        ${recipe.steps.map(x => `<p>${x}</p>`).join('')}
    </div>`;

    return recipeElement;
}