import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useFetchProtected = () => {
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();

    const fetchPrivate = async (url, options = {}) => {
        // Add Authorization header if it's not present
        if (!options.headers) {
            options.headers = {};
        }
        if (!options.headers['Authorization']) {
            options.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }

        // Add credentials if needed (for cookies)
        options.credentials = 'include';

        try {
            let response = await fetch(url, options);

            // If the token is expired, handle 401 and refresh token
            if (response.status === 401) {
                const newAccessToken = await refresh();

                // Update Authorization header with new token and retry the request
                options.headers['Authorization'] = `Bearer ${newAccessToken}`;
                response = await fetch(url, options); // Retry the request
            }

            return response; // Return the response object
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

    return fetchPrivate;
};

export default useFetchProtected;