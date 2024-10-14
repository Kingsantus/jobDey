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
        
        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path='/home' element={<Home />} />
          <Route path='/jobs' element={<JobPosted />} />
          <Route path='/post-job' element={<PostJob />} />
          <Route path='/edit-job' element={<UpdateJob />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App;