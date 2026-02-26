import React, { useState, useEffect } from 'react';
import { searchMealByName, fetchRandomMeal, extractIngredients } from '../api/mealsApi';
import useFetch from '../hooks/useFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRandom, faUtensils, faClock, faGlobe } from '@fortawesome/free-solid-svg-icons';

const MealFinder = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: meals, loading, error, execute } = useFetch();
    const [selectedMeal, setSelectedMeal] = useState(null);

    useEffect(() => {
        execute(searchMealByName, 'chicken');
    }, [execute]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            execute(searchMealByName, searchTerm);
            setSelectedMeal(null);
        }
    };

    const handleRandom = async () => {
        const meal = await fetchRandomMeal();
        if (meal) {
            setSelectedMeal(meal);
        }
    };

    const handleMealClick = (meal) => {
        setSelectedMeal(meal);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    return (
        <div className="meal-page py-5 container mt-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Meal Finder</h1>
                <p className="text-muted">Explore delicious recipes from around the world.</p>
            </div>

            <div className="row justify-content-center mb-5">
                <div className="col-md-8 col-lg-6">
                    <form onSubmit={handleSearch} className="d-flex gap-2">
                        <div className="input-group shadow-lg rounded-pill p-1 glass-card border-0 flex-grow-1">
                            <input
                                type="text"
                                className="form-control border-0 bg-transparent shadow-none px-4"
                                placeholder="Search meal by name (e.g. Pasta, Burger)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-primary rounded-pill px-4" type="submit">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                        <button
                            className="btn btn-secondary glass-card border-0 rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: '54px', height: '54px', minWidth: '54px' }}
                            type="button"
                            onClick={handleRandom}
                            title="Surprise me with a random meal"
                        >
                            <FontAwesomeIcon icon={faRandom} />
                        </button>
                    </form>
                </div>
            </div>

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} onRetry={() => execute(searchMealByName, 'pasta')} />}

            {/* Selected Meal Details */}
            {selectedMeal && (
                <div className="animate-fade-in mb-5">
                    <div className="glass-card p-0 overflow-hidden border-primary border-opacity-25 shadow-lg">
                        <div className="row g-0">
                            <div className="col-lg-5">
                                <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} className="w-100 h-100 object-fit-cover" style={{ minHeight: '400px' }} />
                            </div>
                            <div className="col-lg-7 p-4 p-md-5">
                                <div className="d-flex justify-content-between align-items-start mb-4">
                                    <div>
                                        <span className="badge bg-primary bg-opacity-10 text-primary mb-2 px-3 py-2 rounded-pill fw-600">{selectedMeal.strCategory}</span>
                                        <h2 className="display-6 fw-bold mb-0">{selectedMeal.strMeal}</h2>
                                    </div>
                                    <button className="btn-close shadow-none" onClick={() => setSelectedMeal(null)}></button>
                                </div>

                                <div className="row mb-4 opacity-75 fw-500">
                                    <div className="col-auto d-flex align-items-center">
                                        <FontAwesomeIcon icon={faGlobe} className="me-2 text-primary" />
                                        {selectedMeal.strArea}
                                    </div>
                                    <div className="col-auto d-flex align-items-center ms-3">
                                        <FontAwesomeIcon icon={faUtensils} className="me-2 text-primary" />
                                        Main Ingredient
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-5">
                                        <h5 className="fw-bold mb-3 border-bottom pb-2">Ingredients</h5>
                                        <ul className="list-unstyled">
                                            {extractIngredients(selectedMeal).map((item, idx) => (
                                                <li key={idx} className="mb-2 d-flex align-items-center">
                                                    <span className="bullet me-2 bg-primary rounded-circle" style={{ width: '6px', height: '6px' }}></span>
                                                    <span className="text-muted small fw-600 me-2">{item.measure}</span>
                                                    <span className="fw-500">{item.ingredient}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="col-md-7">
                                        <h5 className="fw-bold mb-3 border-bottom pb-2">Instructions</h5>
                                        <div className="text-muted small" style={{ whiteSpace: 'pre-wrap', maxHeight: '300px', overflowY: 'auto' }}>
                                            {selectedMeal.strInstructions}
                                        </div>
                                    </div>
                                </div>

                                {selectedMeal.strYoutube && (
                                    <div className="mt-4">
                                        <a href={selectedMeal.strYoutube} target="_blank" rel="noopener noreferrer" className="btn btn-danger rounded-pill px-4">
                                            Watch on YouTube
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Meals Grid */}
            <div className="row g-4 animate-fade-in">
                {(meals || []).map((meal) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={meal.idMeal}>
                        <div
                            className="glass-card h-100 p-0 overflow-hidden cursor-pointer hover-lift shadow-sm"
                            onClick={() => handleMealClick(meal)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div style={{ height: '180px', overflow: 'hidden' }}>
                                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-100 h-100 object-fit-cover" />
                            </div>
                            <div className="p-3">
                                <span className="text-primary x-small fw-700 text-uppercase ls-wide">{meal.strCategory}</span>
                                <h5 className="fw-bold mb-0 mt-1 text-truncate">{meal.strMeal}</h5>
                                <p className="text-muted x-small mb-0 mt-2">{meal.strArea} Cuisine</p>
                            </div>
                        </div>
                    </div>
                ))}

                {!loading && (!meals || meals.length === 0) && (
                    <div className="text-center py-5">
                        <h3 className="text-muted">No meals found. Try another search.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MealFinder;
