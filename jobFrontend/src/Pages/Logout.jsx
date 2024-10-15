import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Logout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await fetch('https://jobdey-api.onrender.com/api/v1/auth/logout', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    setAuth({}); // Clear the auth state
                    navigate('/login'); // Redirect to the login page
                } else {
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error('Error occurred during logout:', error);
            }
        };

        logout();
    }, [setAuth, navigate]);

    return null;
}

export default Logout