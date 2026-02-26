export const getWeatherGradient = (weatherMain) => {
    // High contrast dark gradients to ensure white text is ALWAYS visible
    const gradients = {
        Clear: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', // Deep Blue
        Clouds: 'linear-gradient(135deg, #334155 0%, #64748b 100%)', // Dark Slate
        Rain: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', // Deep Indigo
        Drizzle: 'linear-gradient(135deg, #374151 0%, #4b5563 100%)', // Deep Gray
        Thunderstorm: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', // Near Black
        Snow: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', // Deep Slate Snow
        Mist: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        Haze: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        Fog: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        Dust: 'linear-gradient(135deg, #422006 0%, #78350f 100%)', // Dark Amber
        Sand: 'linear-gradient(135deg, #422006 0%, #78350f 100%)',
    };
    return gradients[weatherMain] || 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)';
};

export const getWeatherIcon = (weatherMain, iconCode = '') => {
    const isNight = iconCode.endsWith('n');

    // Default base icons
    let icon = 'faCloud';

    switch (weatherMain) {
        case 'Clear':
            icon = isNight ? 'faMoon' : 'faSun';
            break;
        case 'Clouds':
            // '02d'/'02n' are few clouds, '03'/'04' are scattered/broken
            if (iconCode === '02d' || iconCode === '03d') icon = 'faCloudSun';
            else if (iconCode === '02n' || iconCode === '03n') icon = 'faCloudMoon';
            else icon = 'faCloud'; // heavy clouds
            break;
        case 'Rain':
            icon = 'faCloudShowersHeavy';
            break;
        case 'Drizzle':
            icon = 'faCloudRain';
            break;
        case 'Thunderstorm':
            icon = 'faBolt';
            break;
        case 'Snow':
            icon = 'faSnowflake';
            break;
        case 'Mist':
        case 'Smoke':
        case 'Haze':
        case 'Dust':
        case 'Fog':
        case 'Sand':
        case 'Ash':
            icon = 'faSmog';
            break;
        case 'Squall':
        case 'Tornado':
            icon = 'faWind';
            break;
        default:
            icon = 'faCloud';
    }
    return icon;
};

export const formatTemperature = (temp) => `${Math.round(temp)}°C`;

export const getWindDescription = (speed) => {
    if (speed < 5) return 'Calm';
    if (speed < 15) return 'Gentle Breeze';
    if (speed < 30) return 'Moderate Wind';
    if (speed < 50) return 'Strong Wind';
    return 'Storm';
};

export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }).format(date);
};

export const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
};

export const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
};

export const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
};
