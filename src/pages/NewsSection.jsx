import React, { useState, useEffect } from 'react';
import { fetchLifestyleNews } from '../api/newsApi';
import useFetch from '../hooks/useFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getTimeAgo, truncateText } from '../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const NewsSection = () => {
    const [category, setCategory] = useState('health');
    const { data: news, loading, error, execute } = useFetch();

    const categories = [
        { id: 'health', label: 'Health & Wellness' },
        { id: 'technology', label: 'Technology' },
        { id: 'sports', label: 'Sports' },
        { id: 'entertainment', label: 'Entertainment' },
        { id: 'business', label: 'Business' }
    ];

    useEffect(() => {
        execute(fetchLifestyleNews, category);
    }, [category, execute]);

    return (
        <div className="news-page py-5 container mt-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Lifestyle News</h1>
                <p className="text-muted">Stay informed with the latest trends and headlines from around the world.</p>
            </div>

            {/* Categories */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`btn rounded-pill px-4 fw-600 transition ${category === cat.id ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setCategory(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {loading && <LoadingSpinner />}
            {error && (
                <div className="text-center">
                    <ErrorMessage message={error} onRetry={() => execute(fetchLifestyleNews, category)} />
                    {error.includes("API key") && (
                        <div className="alert alert-info mt-3 mx-auto" style={{ maxWidth: '600px' }}>
                            <strong>Tip:</strong> Get a free API key at <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">newsapi.org</a> and add it to your <code>.env</code> file as <code>VITE_NEWS_API_KEY</code>.
                        </div>
                    )}
                </div>
            )}

            <div className="row g-4 animate-fade-in">
                {(news || []).map((article, index) => (
                    <div className="col-lg-4 col-md-6" key={index}>
                        <div className="glass-card news-card h-100 d-flex flex-column p-0 overflow-hidden hover-lift shadow-sm">
                            <div style={{ height: '220px', overflow: 'hidden' }}>
                                <img
                                    src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000'}
                                    alt={article.title}
                                    className="w-100 h-100 object-fit-cover"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000';
                                    }}
                                />
                            </div>
                            <div className="p-4 flex-grow-1 d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="badge bg-primary bg-opacity-10 text-primary x-small fw-600 px-2 py-1">
                                        {article.source.name}
                                    </span>
                                    <span className="text-muted x-small">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                                        {getTimeAgo(article.publishedAt)}
                                    </span>
                                </div>

                                <h5 className="fw-bold mb-3 article-title">{truncateText(article.title, 70)}</h5>
                                <p className="text-muted small mb-4">{truncateText(article.description, 120)}</p>

                                <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                                    <span className="text-muted x-small">
                                        <FontAwesomeIcon icon={faUser} className="me-1" />
                                        {truncateText(article.author || 'Staff Writer', 20)}
                                    </span>
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-600"
                                    >
                                        Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" size="xs" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {!loading && news && news.length === 0 && (
                    <div className="text-center py-5 w-100">
                        <h3 className="text-muted">No news articles found for this category.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsSection;
