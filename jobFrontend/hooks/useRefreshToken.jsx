import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        // Fetching a new access token from the server
        const response = await fetch("https://jobdey-api.onrender.com/api/v1/auth/refresh", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: 'include'  // This sends cookies with the request
        });

        // Parse the response data
        const data = await response.json();

        // Assuming the access token is stored in a cookie
        const accessToken = getCookie();

        if (!accessToken) {
            setAuth(prev => {
                return { ...prev, user: response.data }; // Update the auth state with the token from the cookie
            });
        } else {
            console.error("Access token not found in cookies");
        }

        return accessToken; // Return the token from the cookie
    }

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    return refresh;
};

export default useRefreshToken;