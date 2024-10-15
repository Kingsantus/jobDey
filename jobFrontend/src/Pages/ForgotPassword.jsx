import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useCheckAuthentication from '../../context/CheckAuth';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');

  // useCheckAuthentication();

  const onSubmit = async (data) => {
    setForgotPasswordError('');
    setForgotPasswordSuccess('');
    try {
      const response = await fetch("https://jobdey-api.onrender.com/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        setForgotPasswordSuccess('Account Confirmed!, check your email (inbox/spam) to change your password');
        // Let the browser prompt to save login info
      } else {
        setForgotPasswordSuccess(result.message || 'Account Confirmed!, check your email (inbox/spam) to change your password.');
      }
      reset();
    } catch (error) {
      setForgotPasswordSuccess('An error occurred. Please try again.');
    }
  };

  return (
    <div className='bg-[#fafafa]'>
      <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Forgot Your Password? Don't Worry
            </h2>
          </div>
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    {...register('email', { required: 'Email is required', pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Enter a valid email' } })}
                    className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue sm:text-sm sm:leading-6"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue">
                  Submit
                </button>
              </div>
              {forgotPasswordSuccess && <p className="text-green-500 text-sm mt-4">{forgotPasswordSuccess}</p>}
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              Remember now?
              <Link to="/login" className='font-semibold leading-6 text-blue hover:text-blue'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ForgotPassword;
