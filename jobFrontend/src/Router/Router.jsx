import { createBrowserRouter, Outlet } from "react-router-dom";
import App from '../App';
import LandingPage from '../Pages/LandingPage';  
import About from '../Pages/About';
import SignUp from '../Pages/SignUp';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import JobPosted from '../Pages/JobPosted'; 
import PostJob from '../Pages/PostJob';
import ForgotPassword from '../Pages/ForgotPassword';
import VerifyEmail from '../Pages/VerifyEmail';
import ResetPassword from '../Pages/ResetPassword';
import RequireAuth from "../components/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // Main App component
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/about", element: <About /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/logout", element: <Login /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/verify-email/:code", element: <VerifyEmail /> },
      { path: "/password/reset", element: <ResetPassword /> },
      { path: '/home', element: <RequireAuth><Home /></RequireAuth> },
      { path: '/jobs', element: <RequireAuth><JobPosted /></RequireAuth> },
      { path: '/post-job', element: <RequireAuth><PostJob /></RequireAuth> },
    ],
  },
]);

export default router;