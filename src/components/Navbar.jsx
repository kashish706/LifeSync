import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const { totalItems, cartItems, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation();

    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top shadow-sm py-3">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center gap-3" to="/" onClick={closeMenu}>
                        <span className="fw-900 fs-3 ls-tight">LifeSync</span>
                    </Link>

                    <div className="d-flex align-items-center gap-2 order-lg-last ms-2">
                        {/* Theme Toggle - Always Visible */}
                        <button
                            className="btn btn-outline-primary border-2 rounded-pill d-flex align-items-center justify-content-center p-0"
                            onClick={toggleTheme}
                            style={{ width: '42px', height: '42px' }}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
                        </button>

                        {/* Cart Trigger */}
                        {location.pathname.startsWith('/shopping') && (
                            <button
                                className="btn btn-primary rounded-pill d-flex align-items-center justify-content-center p-0 position-relative"
                                onClick={() => { setIsCartOpen(true); closeMenu(); }}
                                style={{ width: '42px', height: '42px' }}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} />
                                {totalItems > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-2 border-white shadow-sm" style={{ fontSize: '0.65rem' }}>
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        )}

                        <button
                            className="navbar-toggler border-0 shadow-none p-2 ms-1"
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-primary" />
                        </button>
                    </div>

                    <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center gap-2 me-lg-4">
                            <li className="nav-item">
                                <NavLink className="nav-link px-3" to="/" onClick={closeMenu}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link px-3" to="/about" onClick={closeMenu}>About</NavLink>
                            </li>
                            <li className="nav-item dropdown position-relative">
                                <button
                                    className={`btn nav-link px-3 dropdown-toggle border-0 bg-transparent shadow-none ${isDropdownOpen ? 'show' : ''}`}
                                    onClick={toggleDropdown}
                                >
                                    API Integrations
                                </button>
                                <ul className={`dropdown-menu border-0 shadow-lg glass-card p-2 position-absolute mt-2 ${isDropdownOpen ? 'show d-block' : ''}`} style={{ minWidth: '220px', left: 'auto', right: 0 }}>
                                    <li><NavLink className="dropdown-item rounded py-2 mb-1" to="/weather" onClick={closeMenu}>🌤 Weather Dashboard</NavLink></li>
                                    <li><NavLink className="dropdown-item rounded py-2 mb-1" to="/travel" onClick={closeMenu}>🌍 Travel Explorer</NavLink></li>
                                    <li><NavLink className="dropdown-item rounded py-2 mb-1" to="/meals" onClick={closeMenu}>🍽 Meal Finder</NavLink></li>
                                    <li><NavLink className="dropdown-item rounded py-2 mb-1" to="/shopping" onClick={closeMenu}>🛍 Shopping Products</NavLink></li>
                                    <li><NavLink className="dropdown-item rounded py-2" to="/news" onClick={closeMenu}>📰 Lifestyle News</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link px-3" to="/contact" onClick={closeMenu}>Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Cart Drawer Overlay */}
            {isCartOpen && (
                <div
                    className="cart-overlay position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-60 animate-fade-in"
                    style={{ zIndex: 1060, backdropFilter: 'blur(8px)' }}
                    onClick={() => setIsCartOpen(false)}
                >
                    <div
                        className="cart-drawer position-absolute top-0 end-0 h-100 shadow-lg d-flex flex-column"
                        style={{ width: '100%', maxWidth: '450px', backgroundColor: 'var(--bg-main)', borderLeft: '1px solid var(--card-border)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-bottom d-flex justify-content-between align-items-center" style={{ background: 'var(--card-bg)' }}>
                            <div>
                                <h4 className="fw-800 mb-0 text-primary">Your Cart</h4>
                                <p className="mb-0 text-muted small">{totalItems} items selected</p>
                            </div>
                            <button className="btn btn-outline-secondary rounded-circle border-0" onClick={() => setIsCartOpen(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>

                        <div className="flex-grow-1 overflow-auto p-4">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-5">
                                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-4 mb-4 text-primary">
                                        <FontAwesomeIcon icon={faShoppingCart} size="3x" />
                                    </div>
                                    <h5 className="fw-bold">Your cart is empty</h5>
                                    <p className="text-muted mb-4">Looks like you haven't added anything yet.</p>
                                    <button className="btn btn-primary rounded-pill px-5 py-3 fw-bold" onClick={() => { setIsCartOpen(false); }}>Start Shopping</button>
                                </div>
                            ) : (
                                <div className="d-flex flex-column gap-3">
                                    {cartItems.map(item => (
                                        <div className="glass-card p-3 d-flex gap-3 align-items-center border-0 shadow-sm" key={item.id}>
                                            <div className="bg-white p-2 rounded-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: '80px', height: '80px', minWidth: '80px' }}>
                                                <img src={item.image} alt={item.title} className="img-fluid h-100 object-fit-contain" />
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <h6 className="fw-bold text-truncate mb-1">{item.title}</h6>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="text-primary fw-800 fs-5">${(item.price * item.quantity).toFixed(2)}</span>
                                                    <div className="d-flex align-items-center gap-2 rounded-pill p-1 border" style={{ background: 'var(--card-bg)' }}>
                                                        <button className="btn btn-sm rounded-circle p-0" style={{ width: '28px', height: '28px', background: 'var(--bg-main)', color: 'var(--text-main)' }} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                        <span className="small fw-700 px-1" style={{ color: 'var(--text-main)' }}>{item.quantity}</span>
                                                        <button className="btn btn-sm rounded-circle p-0" style={{ width: '28px', height: '28px', background: 'var(--bg-main)', color: 'var(--text-main)' }} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn btn-link text-danger p-2 border-0 shadow-none opacity-50 hover-opacity-100" onClick={() => removeFromCart(item.id)}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="p-4 border-top" style={{ background: 'var(--card-bg)' }}>
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="text-muted h5 mb-0">Subtotal</span>
                                    <span className="text-primary h4 fw-800 mb-0">${totalPrice.toFixed(2)}</span>
                                </div>
                                <button className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-lg" onClick={() => alert('Checkout feature coming soon!')}>
                                    Checkout Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
