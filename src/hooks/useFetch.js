import { useState, useCallback } from 'react';

const useFetch = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (apiFunction, ...args) => {
        setLoading(true);
        setError(null);
        setData(null);
        try {
            const result = await apiFunction(...args);
            setData(result);
            return result;
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return { data, loading, error, execute, reset };
};

export default useFetch;
