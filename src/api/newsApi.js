const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

// NewsAPI requires a registered API key. Free tier available at newsapi.org
// CORS workaround: Use a proxy or the 'everything' endpoint with specific domains
export const fetchLifestyleNews = async (category = 'health', pageSize = 12) => {
    if (!NEWS_API_KEY || NEWS_API_KEY === 'your_newsapi_key_here') {
        throw new Error('NewsAPI key not configured. Please add VITE_NEWS_API_KEY to your .env file. Get a free key at newsapi.org');
    }

    const queryMap = {
        health: 'health wellness lifestyle',
        technology: 'technology innovation AI',
        sports: 'sports fitness exercise',
        entertainment: 'entertainment movies music',
        business: 'business finance economy',
    };

    const query = queryMap[category] || 'lifestyle';

    const response = await fetch(
        `${BASE_URL}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`,
        { headers: { 'X-Api-Key': NEWS_API_KEY } }
    );

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to fetch news. Check your API key.');
    }

    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message || 'News fetch failed.');
    return data.articles.filter(a => a.title !== '[Removed]' && a.urlToImage);
};
