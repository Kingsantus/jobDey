import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import RequireAuth from './components/RequireAuth';
import LandingPage from './Pages/LandingPage';  
import About from './Pages/About';
import SignUp from './Pages/SignUp';
import JobPosted from './Pages/JobPosted'; 
import PostJob from './Pages/PostJob';
import ForgotPassword from './Pages/ForgotPassword';
import VerifyEmail from './Pages/VerifyEmail';
import ResetPassword from './Pages/ResetPassword';
import UpdateJob from "./Pages/UpdateJob";
import Footer from './components/Footer';
import Page404 from './Pages/404';
import Logout from './Pages/Logout';
import Profile from './Pages/Profile';
import ChangePassword from './Pages/ChangePassword';
import Sessions from './Pages/Sessions';
import PersistLogin from './components/PersistLogin';


// Create a loader function to fetch job data
const jobLoader = async ({ params }) => {
  console.log(`Fetching job data for ID: ${params.id}`);
  const response = await fetch(`http://localhost:5000/api/v1/post/all-jobs/${params.id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Response(errorData.message || 'Failed to fetch job data', { status: response.status });
  }

  const jobData = await response.json();
  console.log('Job Data:', jobData);
  return jobData;
};

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Main routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/verify-email/:code' element={<VerifyEmail />} />
        <Route path='/password/reset' element={<ResetPassword />} />
        <Route path='/unauthorized' element={<Page404 />} />
        <Route element={<PersistLogin />}>
        {/* Protected routes */}
        <Route element={<RequireAuth allowedRoles={['user', 'admin']} />}>
          <Route path='/home' element={<Home />} />
          <Route path='/logout' element={<Logout />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['user']} />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='/sessions' element={<Sessions />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['admin']} />}>
          <Route path='/jobs' element={<JobPosted />} />
          <Route path='/post-job' element={<PostJob />} />
          <Route path='/edit-job/:id' element={<UpdateJob />} loader={jobLoader} />
        </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App;