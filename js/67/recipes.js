const recipeSelection = document.getElementById('recipeSelection');
const recipeName = document.getElementById('recipeName');
const recipePic = document.getElementById('recipePic');
const recipeIngredients = document.getElementById('recipeIngredients');
const recipeDisplaying = document.getElementById('recipeDisplaying');

async function loadRecipelist() {
    try {
        const response = await fetch('recipes.json');
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`); // goes to the catch block
        }
        const recipes = await response.json(); // get the actual recipe list from the JSON file
        recipes.forEach(recipe => {
            const option = document.createElement('option'); // creating a new option element for the select dropdown
            option.value = recipe.url;
            option.textContent = recipe.name;
            recipeSelection.appendChild(option); // push it to the select dropdown
        });
    } catch (error) {
        console.error('Error occured when loading recipes:', error);
    }
}

async function loadRecipe(url) { // 23=
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        const recipe = await response.json();
        recipeName.textContent = recipe.name;
        recipePic.src = recipe.picture;
        recipeIngredients.innerHTML = '';
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            recipeIngredients.appendChild(li);
        });
        recipeDisplaying.style.display = 'block'; // make the recipe display section visible after loading the recipe
    } catch (error) {
        console.error('Error occured when loading recipe:', error);
    }
}

loadRecipelist();

recipeSelection.addEventListener('change', (event) => { // create listener for when dropdown ,selection changes, catch the selected one and pass into recipe loading function
    const url = event.target.value;
    if (url) {
        loadRecipe(url);
    }
});