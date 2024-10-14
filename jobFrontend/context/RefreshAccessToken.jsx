export const refreshAccessToken = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/v1/auth/refresh', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            return data.accessToken; // Return the new access token
        } else {
            throw new Error('Unable to refresh access token.');
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return null; // Return null if refresh failed
    }
};
