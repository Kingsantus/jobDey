import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles = [] }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const userRole = auth?.role;

    return (
        allowedRoles.includes(userRole) // Check if the user's role is allowed
            ? <Outlet /> // If the role is allowed, render the child routes
            : auth?.user // If not, check if user is logged in
                ? <Navigate to="/unauthorized" state={{ from: location }} replace /> // Redirect to unauthorized page if logged in but role is not allowed
                : <Navigate to="/login" state={{ from: location }} replace /> // Redirect to login if not logged in
    );
}

export default RequireAuth;