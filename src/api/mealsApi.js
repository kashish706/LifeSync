const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMealByName = async (name) => {
    const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`);
    if (!response.ok) throw new Error('Failed to search meals.');
    const data = await response.json();
    if (!data.meals) throw new Error('No meals found. Try a different search.');
    return data.meals;
};

export const fetchMealById = async (id) => {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    if (!response.ok) throw new Error('Meal details not available.');
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
};

export const fetchRandomMeal = async () => {
    const response = await fetch(`${BASE_URL}/random.php`);
    if (!response.ok) throw new Error('Failed to fetch random meal.');
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
};

export const fetchMealCategories = async () => {
    const response = await fetch(`${BASE_URL}/categories.php`);
    if (!response.ok) throw new Error('Failed to load categories.');
    const data = await response.json();
    return data.categories || [];
};

export const fetchMealsByCategory = async (category) => {
    const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
    if (!response.ok) throw new Error('Failed to load meals for category.');
    const data = await response.json();
    return data.meals || [];
};

export const extractIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push({ ingredient: ingredient.trim(), measure: measure ? measure.trim() : '' });
        }
    }
    return ingredients;
};
