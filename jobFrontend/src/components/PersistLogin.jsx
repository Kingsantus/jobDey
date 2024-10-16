import React, { useEffect, useState } from 'react'
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import { Outlet } from 'react-router-dom';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        !auth?.user ? verifyRefreshToken() : setIsLoading(false);
    }, []);
  return (
    <>
        {isLoading 
            ? <p>Loading...</p>
            : <Outlet />
        }
    </>
  )
}

export default PersistLogin