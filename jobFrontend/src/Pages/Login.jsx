import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useCheckAuthentication from '../../context/CheckAuth';


const Login = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const navigate = useNavigate();

  useCheckAuthentication();

  const onSubmit = async (data) => {
    setLoginError('');
    setLoginSuccess('');
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      const result = await response.json();
      
      if (result.success) {
        setLoginSuccess('Login successful!');
        
        // Redirect to the home page after a short delay
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        setLoginError(result.message || 'Login failed. Please check your credentials.');
      }
      
      reset();
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='bg-[#fafafa]'>
      <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Welcome Back, Login
            </h2>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="emailOrUsername" className="block text-sm font-medium leading-6 text-gray-900">
                  Email or Username
                </label>
                <div className="mt-0.5">
                  <input
                    id="emailOrUsername"
                    name="emailOrUsername"
                    type="text"
                    {...register('emailOrUsername', { required: 'Email or Username is required' })}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue sm:text-sm sm:leading-6"
                  />
                  {errors.emailOrUsername && <p className="text-red-500 text-sm mt-1">{errors.emailOrUsername.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-0.5">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    {...register('password', {
                      required: 'Password is required',
                      validate: {
                        minLength: (value) => value.length >= 8 || 'Password must be at least 8 characters long',
                        hasUpperLowerNumSpecial: (value) =>
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(value) ||
                          'Password must contain upper & lower case, number, and special character',
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue sm:text-sm sm:leading-6"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    {...register('remember')}
                    className="h-4 w-4 text-blue focus:ring-blue border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to={"/forgot-password"} className="font-semibold leading-6 text-blue hover:text-blue">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                >
                  Sign in
                </button>
              </div>
              {loginError && <p className="text-red-500 text-sm mt-4">{loginError}</p>}
              {loginSuccess && <p className="text-green-500 text-sm mt-4">{loginSuccess}</p>}
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              Don't have an account?
              <Link to={"/signup"} className="font-semibold leading-6 text-blue hover:text-blue">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;