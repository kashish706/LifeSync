const BASE_URL = 'https://restcountries.com/v3.1';

export const searchCountry = async (name) => {
    const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}`);
    if (!response.ok) {
        throw new Error('Country not found. Please try a different search.');
    }
    return response.json();
};

export const fetchAllCountries = async () => {
    const response = await fetch(`${BASE_URL}/all?fields=name,flags,capital,region,population,cca2`);
    if (!response.ok) throw new Error('Failed to load countries.');
    return response.json();
};

export const fetchCountryByCode = async (code) => {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!response.ok) throw new Error('Country details not found.');
    return response.json();
};
