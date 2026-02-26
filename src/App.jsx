import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import WeatherDashboard from './pages/WeatherDashboard';
import TravelExplorer from './pages/TravelExplorer';
import MealFinder from './pages/MealFinder';
import ShoppingProducts from './pages/ShoppingProducts';
import NewsSection from './pages/NewsSection';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className={`app-wrapper ${theme}`}>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/weather" element={<WeatherDashboard />} />
          <Route path="/travel" element={<TravelExplorer />} />
          <Route path="/meals" element={<MealFinder />} />
          <Route path="/shopping" element={<ShoppingProducts />} />
          <Route path="/news" element={<NewsSection />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
