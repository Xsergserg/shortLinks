import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch(url, {method, body, headers});
            const data = await response.json()
            if (!response.ok) {
                let textList = [data.message || 'Something went wrong'];
                for (let er in data.errors) {
                    textList.push(data.errors[er].msg);
                }
                setError(textList);
                throw new Error();
            }
            return data;
        } finally {
            setLoading(false);
        }
    }, []);

    const clearError = useCallback(
        () => setError(null),
        []
    );
    return {loading, request, error, clearError};
}