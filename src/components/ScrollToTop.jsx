import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            className={`btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow-lg ${isVisible ? 'd-block' : 'd-none'}`}
            onClick={scrollToTop}
            style={{
                width: '50px',
                height: '50px',
                zIndex: 1000,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
            }}
        >
            <FontAwesomeIcon icon={faChevronUp} />
        </button>
    );
};

export default ScrollToTop;
