const BASE_URL = 'https://fakestoreapi.com';

export const fetchAllProducts = async () => {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to load products.');
    return response.json();
};

export const fetchProductById = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Product not found.');
    return response.json();
};

export const fetchProductsByCategory = async (category) => {
    const response = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
    if (!response.ok) throw new Error('Failed to load category products.');
    return response.json();
};

export const fetchCategories = async () => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to load categories.');
    return response.json();
};
