<<<<<<< HEAD
window.addEventListener('load', () => {
    let formElement = document.querySelector('form');
    formElement.addEventListener('submit', addRecipe);

    function getFormData() {
        let formData = new FormData(formElement);

        let name = formData.get('name');
        let img = formData.get('img');
        let ingredients = formData.get('ingredients').split('\n');
        let steps = formData.get('steps').split('\n');

        return {
            name,
            img,
            ingredients,
            steps
        }
    }

    async function addRecipe(e) {
        e.preventDefault();

        let recipeData = getFormData();
        let url = 'http://localhost:3030/data/recipes';
        try {
            
            let response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': localStorage.getItem('accessToken')
                },
                body: JSON.stringify(recipeData)
            });
            let data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            window.location.pathname = '01.Cookbook%20part%202/index.html';
        } catch (error) {
            alert(error.message);
        }
    }
=======
window.addEventListener('load', () => {
    let formElement = document.querySelector('form');
    formElement.addEventListener('submit', addRecipe);

    function getFormData() {
        let formData = new FormData(formElement);

        let name = formData.get('name');
        let img = formData.get('img');
        let ingredients = formData.get('ingredients').split('\n');
        let steps = formData.get('steps').split('\n');

        return {
            name,
            img,
            ingredients,
            steps
        }
    }

    async function addRecipe(e) {
        e.preventDefault();

        let recipeData = getFormData();
        let url = 'http://localhost:3030/data/recipes';
        try {
            
            let response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': localStorage.getItem('accessToken')
                },
                body: JSON.stringify(recipeData)
            });
            let data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            window.location.pathname = '01.Cookbook%20part%202/index.html';
        } catch (error) {
            alert(error.message);
        }
    }
>>>>>>> 74c4e2477c3f636cc0044cc2abcf75631a23868a
});