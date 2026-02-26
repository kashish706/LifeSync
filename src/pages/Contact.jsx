import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEnvelope, faPhone, faMapMarkerAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Lifestyle Inquiry',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: 'Lifestyle Inquiry', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <div className="contact-page py-5 container mt-5 animate-fade-in">
            <div className="text-center mb-5 pb-4">
                <h1 className="display-4 fw-bold">Get in Touch</h1>
                <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
                    Have questions or feedback about LifeSync? We'd love to hear from you.
                    Send us a message and we'll get back to you shortly.
                </p>
            </div>

            <div className="row g-5">
                {/* Contact Info */}
                <div className="col-lg-4">
                    <div className="d-flex flex-column gap-4">
                        <div className="glass-card p-4 d-flex align-items-center gap-4 hover-lift">
                            <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', minWidth: '60px' }}>
                                <FontAwesomeIcon icon={faEnvelope} size="lg" />
                            </div>
                            <div>
                                <h5 className="fw-bold mb-1">Email Us</h5>
                                <p className="text-muted small mb-0">support@lifesync.ai</p>
                            </div>
                        </div>

                        <div className="glass-card p-4 d-flex align-items-center gap-4 hover-lift">
                            <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', minWidth: '60px' }}>
                                <FontAwesomeIcon icon={faPhone} size="lg" />
                            </div>
                            <div>
                                <h5 className="fw-bold mb-1">Call Us</h5>
                                <p className="text-muted small mb-0">+91 95038 xxxxx</p>
                            </div>
                        </div>

                        <div className="glass-card p-4 d-flex align-items-center gap-4 hover-lift">
                            <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px', minWidth: '60px' }}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                            </div>
                            <div>
                                <h5 className="fw-bold mb-1">Location</h5>
                                <p className="text-muted small mb-0">Jalandhar, Punjab</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="col-lg-8">
                    <div className="glass-card p-4 p-md-5">
                        {submitted ? (
                            <div className="text-center py-5 animate-fade-in">
                                <FontAwesomeIcon icon={faCheckCircle} size="5x" className="text-success mb-4" />
                                <h2 className="fw-bold">Message Sent!</h2>
                                <p className="text-muted lead">Thank you for reaching out. Our team will contact you very soon.</p>
                                <button className="btn btn-outline-primary mt-4 px-5 rounded-pill" onClick={() => setSubmitted(false)}>Send another message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-600">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="John Doe"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-600">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="john@example.com"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-600">Subject</label>
                                        <select
                                            className="form-select form-control"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        >
                                            <option value="Lifestyle Inquiry">Lifestyle Inquiry</option>
                                            <option value="Technical Support">Technical Support</option>
                                            <option value="Partnership">Partnership</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-600">Message</label>
                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            name="message"
                                            placeholder="How can we help you?"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit"
                                            className="btn btn-primary btn-lg w-100 rounded-pill fw-bold py-3 mt-2"
                                            disabled={loading} >                                    
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Contact;
