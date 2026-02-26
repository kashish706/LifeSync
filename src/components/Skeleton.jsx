import React from 'react';

const Skeleton = ({ width = '100%', height = '150px', className = '' }) => {
    return (
        <div
            className={`skeleton ${className}`}
            style={{ width, height, marginBottom: '1rem' }}
        ></div>
    );
};

export const ProductSkeleton = () => (
    <div className="glass-card p-0 overflow-hidden h-100">
        <Skeleton height="200px" className="rounded-0" />
        <div className="p-3">
            <Skeleton width="40%" height="15px" />
            <Skeleton width="90%" height="24px" />
            <div className="d-flex justify-content-between mt-3">
                <Skeleton width="30%" height="30px" />
                <Skeleton width="30%" height="30px" />
            </div>
        </div>
    </div>
);

export const NewsSkeleton = () => (
    <div className="glass-card p-0 overflow-hidden h-100">
        <Skeleton height="220px" className="rounded-0" />
        <div className="p-4">
            <div className="d-flex justify-content-between mb-3">
                <Skeleton width="30%" height="15px" />
                <Skeleton width="20%" height="15px" />
            </div>
            <Skeleton width="100%" height="60px" />
            <Skeleton width="100%" height="40px" className="mt-3" />
            <div className="mt-4 pt-3 border-top d-flex justify-content-between">
                <Skeleton width="40%" height="20px" />
                <Skeleton width="30%" height="30px" className="rounded-pill" />
            </div>
        </div>
    </div>
);

export default Skeleton;
