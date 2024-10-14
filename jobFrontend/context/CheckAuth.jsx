import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const useCheckAuthentication = () => {
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/user/current', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const userData = await response.json();
                    const { user } = userData;
                    setAuth({ user, role:user.role });
                    navigate('/home', { replace: true });
                } else {
                    console.log('User is not authenticated. Redirecting to login.');
                    navigate('/login', { replace: true }); // Redirect to login if not authenticated
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };

        checkAuthentication();
    }, [navigate, setAuth]); // Added setAuth to dependencies
};

export default useCheckAuthentication;