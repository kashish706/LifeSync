import React, { useState, useEffect } from 'react';
import { fetchAllProducts, fetchCategories, fetchProductsByCategory } from '../api/productsApi';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar, faFilter, faEye } from '@fortawesome/free-solid-svg-icons';

const ShoppingProducts = () => {
    const { data: products, loading, error, execute } = useFetch();
    const { data: categories, execute: fetchCats } = useFetch();
    const { addToCart } = useCart();

    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        execute(fetchAllProducts);
        fetchCats(fetchCategories);
    }, [execute, fetchCats]);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        if (category === 'all') {
            execute(fetchAllProducts);
        } else {
            execute(fetchProductsByCategory, category);
        }
    };

    const openProductModal = (product) => {
        setSelectedProduct(product);
    };

    return (
        <div className="shopping-page py-5 container mt-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Smart Shopping</h1>
                <p className="text-muted">Premium lifestyle products delivered to your digital doorstep.</p>
            </div>

            {/* Categories */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
                <button
                    className={`btn rounded-pill px-4 fw-600 ${activeCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => handleCategoryChange('all')}
                >
                    All Products
                </button>
                {(categories || []).map((cat) => (
                    <button
                        key={cat}
                        className={`btn rounded-pill px-4 fw-600 ${activeCategory === cat ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => handleCategoryChange(cat)}
                        style={{ textTransform: 'capitalize' }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} onRetry={() => execute(fetchAllProducts)} />}

            <div className="row g-4 animate-fade-in">
                {(products || []).map((product) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                        <div className="glass-card product-card h-100 d-flex flex-column p-0 overflow-hidden hover-lift border-0 shadow-sm">
                            <div
                                className="bg-white p-4 d-flex align-items-center justify-content-center position-relative"
                                style={{ height: '220px', cursor: 'pointer' }}
                                onClick={() => openProductModal(product)}
                            >
                                <img src={product.image} alt={product.title} className="max-w-100 max-h-100 object-fit-contain p-2" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                <div className="position-absolute top-0 end-0 m-2">
                                    <span className="badge bg-warning text-dark rounded-pill">
                                        <FontAwesomeIcon icon={faStar} className="me-1" /> {product.rating.rate}
                                    </span>
                                </div>
                            </div>
                            <div className="p-3 flex-grow-1 d-flex flex-column">
                                <span className="text-muted small mb-1 text-capitalize">{product.category}</span>
                                <h6 className="fw-bold text-truncate mb-2" title={product.title}>{product.title}</h6>
                                <div className="mt-auto">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="h5 fw-800 text-primary mb-0">${product.price.toFixed(2)}</span>
                                        <span className="text-muted x-small">{product.rating.count} reviews</span>
                                    </div>
                                    <button
                                        className="btn btn-primary w-100 rounded-pill fw-600 py-2"
                                        onClick={() => addToCart(product)}
                                    >
                                        <FontAwesomeIcon icon={faShoppingCart} className="me-2" /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content glass-card border-0 p-0 overflow-hidden">
                            <div className="modal-body p-0">
                                <div className="row g-0">
                                    <div className="col-md-5 bg-white p-5 d-flex align-items-center justify-content-center">
                                        <img src={selectedProduct.image} alt={selectedProduct.title} className="img-fluid" style={{ maxHeight: '300px' }} />
                                    </div>
                                    <div className="col-md-7 p-4 p-md-5 d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <span className="text-primary text-uppercase fw-bold x-small ls-wide">{selectedProduct.category}</span>
                                                <h3 className="fw-bold mt-1">{selectedProduct.title}</h3>
                                            </div>
                                            <button type="button" className="btn-close" onClick={() => setSelectedProduct(null)} aria-label="Close"></button>
                                        </div>

                                        <div className="mb-4">
                                            <div className="d-flex align-items-center mb-2">
                                                <div className="text-warning me-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FontAwesomeIcon key={i} icon={faStar} className={i < Math.round(selectedProduct.rating.rate) ? 'text-warning' : 'text-muted opacity-25'} />
                                                    ))}
                                                </div>
                                                <span className="text-muted small">({selectedProduct.rating.count} customer reviews)</span>
                                            </div>
                                            <h2 className="text-primary fw-800 mb-3">${selectedProduct.price.toFixed(2)}</h2>
                                            <p className="text-muted small">{selectedProduct.description}</p>
                                        </div>

                                        <div className="mt-auto pt-4 border-top">
                                            <button
                                                className="btn btn-primary btn-lg w-100 rounded-pill fw-700"
                                                onClick={() => {
                                                    addToCart(selectedProduct);
                                                    setSelectedProduct(null);
                                                }}
                                            >
                                                Add to Cart - ${selectedProduct.price.toFixed(2)}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingProducts;
