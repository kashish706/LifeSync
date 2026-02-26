import React, { useState, useEffect } from 'react';
import { searchCountry, fetchAllCountries } from '../api/countriesApi';
import useFetch from '../hooks/useFetch';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { formatNumber } from '../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faUsers, faGlobe, faBuilding } from '@fortawesome/free-solid-svg-icons';

const TravelExplorer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [displayCountries, setDisplayCountries] = useState([]);
    const { data: countries, loading, error, execute } = useFetch();

    useEffect(() => {
        execute(fetchAllCountries);
    }, [execute]);

    useEffect(() => {
        if (countries) {
            setDisplayCountries(countries.slice(0, 12));
        }
    }, [countries]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            execute(fetchAllCountries);
            return;
        }
        execute(searchCountry, searchTerm);
    };

    return (
        <div className="travel-page py-5 container mt-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">Travel Explorer</h1>
                <p className="text-muted">Discover information about any country in the world.</p>
            </div>

            <div className="row justify-content-center mb-5">
                <div className="col-md-8 col-lg-6">
                    <form onSubmit={handleSearch}>
                        <div className="input-group shadow-lg rounded-pill p-1 glass-card border-0">
                            <input
                                type="text"
                                className="form-control border-0 bg-transparent shadow-none px-4"
                                placeholder="Search country by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-primary rounded-pill px-4" type="submit">
                                <FontAwesomeIcon icon={faSearch} className="me-2" /> Explore
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} onRetry={() => execute(fetchAllCountries)} />}

            <div className="row g-4 animate-fade-in">
                {(countries || []).map((country, index) => (
                    <div className="col-lg-4 col-md-6" key={country.cca2 || index}>
                        <div className="glass-card h-100 p-0 overflow-hidden">
                            <div className="flag-container" style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                                <img
                                    src={country.flags.svg || country.flags.png}
                                    alt={`${country.name.common} flag`}
                                    className="w-100 h-100 object-fit-cover transition-scale"
                                    style={{ transition: 'transform 0.5s ease' }}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="h4 fw-bold mb-3 d-flex align-items-center justify-content-between">
                                    {country.name.common}
                                    <span className="badge bg-primary bg-opacity-10 text-primary small fw-600 px-3 py-2 rounded-pill">
                                        {country.cca2}
                                    </span>
                                </h3>

                                <div className="mb-2 d-flex align-items-center text-muted">
                                    <FontAwesomeIcon icon={faBuilding} className="me-2 text-primary" width="16" />
                                    <span className="small fw-500">Capital: </span>
                                    <span className="ms-2 text-main">{Array.isArray(country.capital) ? country.capital[0] : country.capital || 'N/A'}</span>
                                </div>

                                <div className="mb-2 d-flex align-items-center text-muted">
                                    <FontAwesomeIcon icon={faGlobe} className="me-2 text-primary" width="16" />
                                    <span className="small fw-500">Region: </span>
                                    <span className="ms-2 text-main">{country.region}</span>
                                </div>

                                <div className="mb-4 d-flex align-items-center text-muted">
                                    <FontAwesomeIcon icon={faUsers} className="me-2 text-primary" width="16" />
                                    <span className="small fw-500">Population: </span>
                                    <span className="ms-2 text-main">{formatNumber(country.population)}</span>
                                </div>

                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(country.name.common)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-primary w-100 rounded-pill fw-600"
                                >
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> View on Maps
                                </a>
                            </div>
                        </div>
                    </div>
                ))}

                {!loading && countries && countries.length === 0 && (
                    <div className="text-center py-5">
                        <h3 className="text-muted">No countries found.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TravelExplorer;
