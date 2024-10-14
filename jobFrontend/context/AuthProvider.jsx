import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, role: null });

    const handleSetAuth = (user) => {
        setAuth(user);
    };

    const handleLogout = () => {
        setAuth({ user: null, role:null }); // Clear user data
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth: handleSetAuth, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
