import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="container py-5">
            <div className="glass-card text-center p-5 mx-auto" style={{ maxWidth: '500px' }}>
                <div className="text-danger mb-4">
                    <FontAwesomeIcon icon={faExclamationTriangle} size="4x" />
                </div>
                <h3 className="mb-3">Oops! Something went wrong</h3>
                <p className="text-muted mb-4">{message || "We couldn't fetch the data. Please check your connection or try again later."}</p>
                {onRetry && (
                    <button className="btn btn-primary px-4 py-2" onClick={onRetry}>
                        <FontAwesomeIcon icon={faSyncAlt} className="me-2" />
                        Try Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;
