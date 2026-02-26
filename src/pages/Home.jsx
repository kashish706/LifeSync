import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faGlobeAmericas, faUtensils, faShoppingBag, faNewspaper, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const features = [
        {
            title: 'Weather Dashboard',
            desc: 'Real-time weather tracking with dynamic visuals based on local conditions.',
            icon: faCloudSun,
            link: '/weather',
            color: '#0ea5e9'
        },
        {
            title: 'Travel Explorer',
            desc: 'Discover detailed information about countries across the globe.',
            icon: faGlobeAmericas,
            link: '/travel',
            color: '#10b981'
        },
        {
            title: 'Meal Finder',
            desc: 'Explore thousands of recipes and cooking instructions instantly.',
            icon: faUtensils,
            link: '/meals',
            color: '#f59e0b'
        },
        {
            title: 'Smart Shopping',
            desc: 'Browse premium products with category filtering and local cart.',
            icon: faShoppingBag,
            link: '/shopping',
            color: '#ec4899'
        },
        {
            title: 'Lifestyle News',
            desc: 'Stay informed with the latest headlines in health, tech, and sports.',
            icon: faNewspaper,
            link: '/news',
            color: '#8b5cf6'
        }
    ];

    return (
        <div className="home-page pb-5">
            {/* Hero Section */}
            <section className="hero-section container animate-fade-in">
                <h1 className="hero-title">Sync Your Life<br />With Intelligence</h1>
                <p className="lead text-muted mx-auto mb-5" style={{ maxWidth: '700px' }}>
                    LifeSync is your all-in-one assistant that connects you to the world.
                    Real-time insights, recipes, shopping, and more—all in one beautiful dashboard.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/weather" className="btn btn-primary btn-lg px-5">Get Started</Link>
                    <Link to="/about" className="btn btn-outline-primary btn-lg px-5">Learn More</Link>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="container mt-5 pt-5">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold mb-3">One App, Many Worlds</h2>
                    <p className="text-muted">Explore our integrated features designed for your lifestyle.</p>
                </div>

                <div className="row g-4">
                    {features.map((f, i) => (
                        <div className="col-lg-4 col-md-6" key={i}>
                            <div className="glass-card h-100 p-4">
                                <div
                                    className="icon-box d-flex align-items-center justify-content-center mb-4"
                                    style={{ width: '60px', height: '60px', borderRadius: '15px', background: `${f.color}15`, color: f.color }}
                                >
                                    <FontAwesomeIcon icon={f.icon} size="2x" />
                                </div>
                                <h3>{f.title}</h3>
                                <p className="text-muted mb-4">{f.desc}</p>
                                <Link to={f.link} className="text-decoration-none fw-600 d-flex align-items-center gap-2" style={{ color: f.color }}>
                                    Explore Now <FontAwesomeIcon icon={faArrowRight} size="sm" />
                                </Link>
                            </div>
                        </div>
                    ))}

                    <div className="col-lg-4 col-md-6">
                        <div className="glass-card h-100 p-4 d-flex flex-column justify-content-center text-center bg-primary bg-opacity-10 border-primary border-opacity-25" style={{ borderStyle: 'dashed' }}>
                            <h4 className="mb-3">More Coming Soon!</h4>
                            <p className="text-muted mb-0">We're constantly adding new modules to your lifestyle dashboard.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="stats-section py-5 mt-5">
                <div className="container">
                    <div className="row text-center gy-4">
                        <div className="col-md-3">
                            <h2 className="display-4 fw-800 text-primary">5+</h2>
                            <p className="text-muted mb-0">LIVE API Integrations</p>
                        </div>
                        <div className="col-md-3">
                            <h2 className="display-4 fw-800 text-primary">100k+</h2>
                            <p className="text-muted mb-0">Daily Updates</p>
                        </div>
                        <div className="col-md-3">
                            <h2 className="display-4 fw-800 text-primary">Ultra</h2>
                            <p className="text-muted mb-0">Fast Performance</p>
                        </div>
                        <div className="col-md-3">
                            <h2 className="display-4 fw-800 text-primary">100%</h2>
                            <p className="text-muted mb-0">Responsive UI</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="container py-5 mt-5">
                <div className="glass-card bg-primary text-white p-5 text-center position-relative overflow-hidden">
                    <div className="position-relative z-1">
                        <h2 className="display-5 fw-bold mb-4">Ready to simplify your digital life?</h2>
                        <p className="lead mb-5 opacity-75">Start exploring LifeSync today and experience the future of lifestyle dashboards.</p>
                        <Link to="/contact" className="btn btn-light btn-lg px-5 fw-bold text-primary">Get in Touch</Link>
                    </div>
                    <div className="position-absolute top-50 start-50 translate-middle opacity-25" style={{ filter: 'blur(100px)', width: '500px', height: '500px', background: 'white', borderRadius: '50%' }}></div>
                </div>
            </section>
        </div>
    );
};

export default Home;
