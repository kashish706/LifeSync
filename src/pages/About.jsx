import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faPalette, faRocket, faUsers, faLayerGroup, faBolt } from '@fortawesome/free-solid-svg-icons';
import { faReact, faBootstrap, faJsSquare, faCss3Alt } from '@fortawesome/free-brands-svg-icons';

const About = () => {
    const techStack = [
        { name: 'React', icon: faReact, color: '#61dafb', desc: 'Modern UI framework with hooks and context API.' },
        { name: 'Vite', icon: faBolt, color: '#646cff', desc: 'Next-generation frontend tool for fast building.' },
        { name: 'Bootstrap 5', icon: faBootstrap, color: '#7952b3', desc: 'Powerful, extensible, and feature-packed frontend toolkit.' },
        { name: 'Vanilla CSS', icon: faCss3Alt, color: '#264de4', desc: 'Custom glassmorphism design system and animations.' },
        { name: 'Async/Await', icon: faJsSquare, color: '#f7df1e', desc: 'High-performance real-time API communications.' },
        { name: 'React Router', icon: faLayerGroup, color: '#ca4245', desc: 'Declarative routing for React applications.' },
    ];

    return (
        <div className="about-page py-5 container mt-5 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-5 pb-4">
                <h1 className="display-4 fw-bold">About LifeSync</h1>
                <p className="text-muted lead mx-auto" style={{ maxWidth: '700px' }}>
                    LifeSync is more than just a dashboard—it's a vision for a more connected,
                    streamlined, and beautiful digital lifestyle.
                </p>
            </div>

            <div className="row g-5 mb-5 align-items-center">
                <div className="col-lg-6">
                    <div className="glass-card p-4 p-md-5">
                        <h2 className="fw-bold mb-4">Our Mission</h2>
                        <p className="text-muted mb-4">
                            Our mission is to simplify daily digital interactions by consolidating fragmented
                            information into a single, cohesive, and aesthetically pleasing interface. We believe
                            that technology should be an assistant, not a distraction.
                        </p>
                        <div className="row g-4">
                            <div className="col-6">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="icon-sm bg-primary bg-opacity-10 text-primary rounded-3 p-2">
                                        <FontAwesomeIcon icon={faRocket} />
                                    </div>
                                    <span className="fw-600">Fast Performance</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="icon-sm bg-primary bg-opacity-10 text-primary rounded-3 p-2">
                                        <FontAwesomeIcon icon={faPalette} />
                                    </div>
                                    <span className="fw-600">Modern UX</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="glass-card h-100 p-0 overflow-hidden bg-primary bg-opacity-10 border-0 d-flex align-items-center justify-content-center" style={{ minHeight: '300px' }}>
                        <div className="text-center p-5">
                            <FontAwesomeIcon icon={faUsers} size="5x" className="text-primary opacity-25 mb-4" />
                            <h3 className="fw-bold">Join the Synced World</h3>
                            <p className="text-muted small">Collaborative lifestyle management starts here.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <section className="mb-5 py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Engineered with Precision</h2>
                    <p className="text-muted">A production-ready stack for ultimate reliability and scale.</p>
                </div>
                <div className="row g-4">
                    {techStack.map((tech, i) => (
                        <div className="col-lg-4 col-md-6" key={i}>
                            <div className="glass-card h-100 p-4 border-0 hover-lift">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="p-3 rounded-4 shadow-sm" style={{ background: `${tech.color}15`, color: tech.color }}>
                                        <FontAwesomeIcon icon={tech.icon} size="2x" />
                                    </div>
                                    <h4 className="mb-0">{tech.name}</h4>
                                </div>
                                <p className="text-muted mb-0 small">{tech.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Developer Card */}
            <div className="row justify-content-center py-5">
                <div className="col-lg-10">
                    <div className="glass-card p-4 p-md-5 text-center">
                        <h2 className="display-5 fw-900 text-primary mb-4">The Developer</h2>
                        <p className="lead mb-5 opacity-90 mx-auto" style={{ maxWidth: '800px' }}>
                            Designed and built by a senior full-stack team focused on creating
                            premium digital experiences that push the boundaries of modern web development.
                        </p>
                        <div className="d-flex justify-content-center flex-wrap gap-4 gap-md-5 mt-4">
                            <div className="text-center px-3">
                                <h3 className="display-6 fw-900 text-primary mb-1">100%</h3>
                                <p className="text-muted fw-600 mb-0">React Hooks</p>
                            </div>
                            <div className="vr d-none d-md-block opacity-25"></div>
                            <div className="text-center px-3">
                                <h3 className="display-6 fw-900 text-primary mb-1">No</h3>
                                <p className="text-muted fw-600 mb-0">Placeholders</p>
                            </div>
                            <div className="vr d-none d-md-block opacity-25"></div>
                            <div className="text-center px-3">
                                <h3 className="display-6 fw-900 text-primary mb-1">Live</h3>
                                <p className="text-muted fw-600 mb-0">API Data</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
