import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [resetPasswordError, setResetPasswordError] = useState('');
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setResetPasswordError('');
        setResetPasswordSuccess('');
        setIsSubmitting(true);

        try {
            // Send request to backend
            const response = await fetch('http://localhost:5000/api/v1/user/change-password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            const result = await response.json();

            if (response.ok) {
                setResetPasswordSuccess('Password changed successfully!');
                setTimeout(() => {
                    navigate('/profile');
                }, 1000);
            } else {
                setResetPasswordError(result.message || 'Password change failed.');
            }

            reset();
        } catch (error) {
            setResetPasswordError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#fafafa]">
            <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Change Your Password!
                        </h2>
                    </div>
                    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label htmlFor="oldPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                    Old Password
                                </label>
                                <div className="mt-0.5">
                                    <input
                                        id="oldPassword"
                                        name="oldPassword"
                                        type="password"
                                        {...register('oldPassword', {
                                            required: 'Old password is required',
                                            validate: {
                                                minLength: (value) => value.length >= 8 || 'Password must be at least 8 characters long',
                                                hasUpperLowerNumSpecial: (value) =>
                                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(value) ||
                                                    'Password must contain upper & lower case, number, and special character (@$!%*?&#)',
                                            },
                                        })}
                                        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue sm:text-sm sm:leading-6"
                                    />
                                    {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    New Password
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
                                                    'Password must contain upper & lower case, number, and special character (@$!%*?&#)',
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
                            {resetPasswordError && <p className="text-red-500 text-sm mt-4">{resetPasswordError}</p>}
                            {resetPasswordSuccess && <p className="text-green-500 text-sm mt-4">{resetPasswordSuccess}</p>}

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
