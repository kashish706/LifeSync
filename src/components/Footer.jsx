import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-4">
                        <h3 className="text-primary mb-3">LifeSync</h3>
                        <p className="text-muted">
                            Enhancing your daily life through smart integrations and beautiful technology.
                            Sync your world with LifeSync.
                        </p>
                        <div className="mt-4">
                            <a href="#" className="social-link"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="#" className="social-link"><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="#" className="social-link"><FontAwesomeIcon icon={faInstagram} /></a>
                        </div>
                    </div>

                    <div className="col-lg-2 offset-lg-1">
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/" className="text-muted text-decoration-none hover-primary">Home</Link></li>
                            <li className="mb-2"><Link to="/about" className="text-muted text-decoration-none hover-primary">About Us</Link></li>
                            <li className="mb-2"><Link to="/contact" className="text-muted text-decoration-none hover-primary">Contact</Link></li>
                            <li className="mb-2"><Link to="/weather" className="text-muted text-decoration-none hover-primary">Weather</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-2">
                        <h5 className="mb-3">API Partners</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><a href="https://openweathermap.org/" className="text-muted text-decoration-none">OpenWeather</a></li>
                            <li className="mb-2"><a href="https://newsapi.org/" className="text-muted text-decoration-none">NewsAPI</a></li>
                            <li className="mb-2"><a href="https://fakestoreapi.com/" className="text-muted text-decoration-none">FakeStore</a></li>
                            <li className="mb-2"><a href="https://www.themealdb.com/" className="text-muted text-decoration-none">TheMealDB</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-3">
                        <h5 className="mb-3">Newsletter</h5>
                        <p className="text-muted small">Stay updated with our latest features.</p>
                        <div className="input-group">
                            <input type="email" className="form-control" placeholder="Email address" />
                            <button className="btn btn-primary" type="button">Join</button>
                        </div>
                    </div>
                </div>

                <div className="border-top border-secondary mt-5 pt-4 text-center">
                    <p className="text-muted small mb-0">
                        © {new Date().getFullYear()} LifeSync – Smart Lifestyle Assistant. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
