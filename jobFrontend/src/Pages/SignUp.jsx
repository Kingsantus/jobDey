import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CountryDropdown } from 'react-country-region-selector';
import { Link } from 'react-router-dom';
import useCheckAuthentication from '../../context/CheckAuth';

const SignUp = () => {
  const { register, handleSubmit, setValue, formState: { errors }, watch, reset } = useForm();
  const [country, setCountry] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  
  useCheckAuthentication();

  const onSubmit = async (data) => {
    setRegisterError('');
    setRegisterSuccess('');
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        setRegisterSuccess('Registered Successfully!, check your email (inbox/spam) to verify your Account');
        // Let the browser prompt to save login info
      } else {
        setRegisterError(result.message || 'Registration failed. Please check your credentials.');
      }
      reset();
    } catch (error) {
      setRegisterError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='bg-[#fafafa]'>
      <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up JobDey
            </h2>
          </div>
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  User Name
                </label>
                <div className="mt-0.5">
                  <input
                    id="username"
                    {...register('username', { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-blue-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                  {errors.username && <p className="text-red-600 text-sm">Username is required</p>}
                </div>
              </div>

              <div>
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
                <div className="mt-0.5">
                  <input
                    id="firstName"
                    {...register('firstName', { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-blue-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                  {errors.firstName && <p className="text-red-600 text-sm">First name is required</p>}
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <div className="mt-0.5">
                  <input
                    id="lastName"
                    {...register('lastName', { required: true })}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-blue-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                  {errors.lastName && <p className="text-red-600 text-sm">Last name is required</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-0.5">
                  <input
                    id="email"
                    type="email"
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                  {errors.email && <p className="text-red-600 text-sm">Please enter a valid email</p>}
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Country
                </label>
                <div className="mt-0.5">
                  <CountryDropdown
                    value={country}
                    onChange={(val) => {
                      setCountry(val);
                      setValue('country', val, { shouldValidate: true });
                    }}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-blue-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-0.5">
                  <input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword', { 
                      required: 'Please confirm your password',
                      validate: (value) => value === watch('password') || 'Passwords do not match',
                    })}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  />
                  {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue">
                  Sign up
                </button>
              </div>
              {registerError && <p className="text-red-500 text-sm mt-4">{registerError}</p>}
              {registerSuccess && <p className="text-green-500 text-sm mt-4">{registerSuccess}</p>}
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              Already Signed Up?{' '}
              <Link to="/login" className="font-semibold leading-6 text-blue hover:text-blue">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;