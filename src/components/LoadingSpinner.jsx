import React from 'react';

const LoadingSpinner = ({ fullPage = false }) => {
    const content = (
        <div className="d-flex flex-column align-items-center justify-content-center p-5">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted fw-500 animate-pulse">Syncing your data...</p>
        </div>
    );

    if (fullPage) {
        return (
            <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center" style={{ zIndex: 9999, backdropFilter: 'blur(5px)' }}>
                {content}
            </div>
        );
    }

    return content;
};

export default LoadingSpinner;
