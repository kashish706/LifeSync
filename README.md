# LifeSync

A comprehensive lifestyle and productivity web application built with React and Vite. LifeSync brings together multiple features to help users manage their meals, track weather, stay informed about news, explore travel destinations, and shop for products—all in one intuitive platform.

## 🎯 Features

- **Meal Finder** - Discover recipes and meal ideas with detailed nutritional information
- **Weather Dashboard** - Real-time weather updates and forecasts for different locations
- **News Section** - Stay updated with the latest news from around the world
- **Shopping Products** - Browse and manage a curated collection of products
- **Travel Explorer** - Explore travel destinations and holiday information
- **Dark Mode Support** - Toggle between light and dark themes for comfortable viewing
- **Shopping Cart** - Add products to cart and manage purchases
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** CSS with responsive design
- **State Management:** React Context API
- **HTTP Client:** Fetch API
- **Code Quality:** ESLint

## 📦 Project Structure

```
src/
├── api/                    # API integration modules
│   ├── countriesApi.js
│   ├── mealsApi.js
│   ├── newsApi.js
│   ├── productsApi.js
│   └── weatherApi.js
├── components/             # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Loader.jsx
│   ├── LoadingSpinner.jsx
│   ├── ErrorMessage.jsx
│   ├── Skeleton.jsx
│   └── ScrollToTop.jsx
├── context/               # Context for state management
│   ├── CartContext.jsx
│   └── ThemeContext.jsx
├── hooks/                 # Custom React hooks
│   ├── useFetch.js
│   ├── useDebounce.js
│   └── useScrollPosition.js
├── pages/                 # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── MealFinder.jsx
│   ├── WeatherDashboard.jsx
│   ├── NewsSection.jsx
│   ├── ShoppingProducts.jsx
│   ├── TravelExplorer.jsx
│   └── api/               # API-specific pages
├── services/              # Business logic services
│   ├── fitnessservice.js
│   ├── weatherservice.js
│   ├── recipeservice.js
│   ├── holidayservice.js
│   └── productservice.js
├── styles/               # Global styles
├── utils/                # Helper utilities
└── App.jsx               # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd LifeSync
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This generates an optimized build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📚 Key Features Explained

### Custom Hooks
- **useFetch** - Handles API data fetching with loading and error states
- **useDebounce** - Implements debouncing for search inputs
- **useScrollPosition** - Tracks scroll position for UI interactions

### Context API Usage
- **CartContext** - Manages shopping cart state globally
- **ThemeContext** - Handles light/dark theme switching

### Responsive Components
- Loading spinners and skeleton screens for better UX
- Error message handling
- Smooth scrolling and navigation

## 🌐 Supported APIs

The application integrates with multiple external APIs:
- **Meals API** - Recipe and meal information
- **Weather API** - Real-time weather data
- **News API** - Latest news updates
- **Products API** - Product catalog
- **Countries API** - Geographic and travel information

## 📝 License

This project is open source and available for educational and personal use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support, please use the Contact page within the application or reach out through the project repository.

---

**Built with ❤️ using React and Vite**
