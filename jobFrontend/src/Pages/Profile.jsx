import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import useFetchProtected from '../../hooks/useFetchProtected';
import { CountryDropdown } from 'react-country-region-selector';

const Profile = () => {
    const { auth } = useAuth();
    const { firstName, lastName, country: userCountry, username, profilePicture } = auth.user;
    const [updatedError, setUpdatedError] = useState('');
    const [updatedSuccess, setUpdatedSuccess] = useState('');
    const [country, setCountry] = useState(userCountry);

    // Initialize react-hook-form
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            firstName,
            lastName,
            country: userCountry,
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await useFetchProtected('http://localhost:5000/api/v1/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const result = await response.json();
            setUpdatedSuccess('Profile updated successfully!');
            setUpdatedError(''); // Clear any previous errors
        } catch (error) {
            setUpdatedError(error.message);
            setUpdatedSuccess(''); // Clear any previous success messages
        }
    };

    return (
        <div className="my-10 p-6 rounded-lg shadow-md max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <h4 className="font-bold text-lg mb-4">Account settings</h4>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 border-r border-gray-200 pr-4">
                    <div className="flex flex-col">
                        <Link className="py-2 px-4 font-semibold text-gray-800 hover:text-gray-500 rounded-lg mb-2" to={"/profile"} >General</Link>
                        <Link className="py-2 px-4 font-semibold text-gray-800 hover:text-gray-500 rounded-lg mb-2" to={"/change-password"} >Change password</Link>
                        <Link className="py-2 px-4 font-semibold text-gray-800 hover:text-gray-500 rounded-lg mb-2" to={"/sessions"} >Logs</Link>
                        <Link className="py-2 px-4 font-semibold text-gray-800 hover:text-gray-500 rounded-lg mb-2" to={"/notification"}>Notifications</Link>
                    </div>
                </div>
                <div className="md:w-3/4 pl-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="account-general">
                                <div className="flex items-center mb-4">
                                    <img src={profilePicture} alt={username} className="w-20 h-20 rounded-full" />
                                    <div className="ml-4">
                                        <label className="btn border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white cursor-pointer">
                                            Upload new photo
                                            <input type="file" className="hidden" />
                                        </label>
                                        <button className="btn border border-gray-300 text-gray-600 hover:bg-gray-200 ml-2">Reset</button>
                                        <div className="text-gray-500 text-sm mt-1">Allowed JPG, GIF or PNG. Max size of 2MB</div>
                                    </div>
                                </div>
                                <hr className="border-gray-300 mb-4" />
                                <div className="space-y-4">
                                    <div>
                                        <label className="block mb-1 font-medium">Username</label>
                                        <input
                                            type="text"
                                            className="border border-gray-300 p-2 w-full"
                                            value={username} // Displaying but not editable
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">First Name</label>
                                        <input
                                            type="text"
                                            className="border border-gray-300 p-2 w-full"
                                            {...register('firstName')}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Last Name</label>
                                        <input
                                            type="text"
                                            className="border border-gray-300 p-2 w-full"
                                            {...register('lastName')}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-medium">Country</label>
                                        <CountryDropdown
                                            value={country}
                                            onChange={(val) => {
                                                setCountry(val);
                                                setValue('country', val, { shouldValidate: true });
                                            }}
                                            className="border border-gray-300 p-2 w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Other tabs can remain the same */}
                            <button className="mt-4 bg-blue text-white py-2 px-4 rounded" type="submit">
                                Save Changes
                            </button>
                        </div>
                        {updatedError && <p className="text-red-500 text-sm mt-4">{updatedError}</p>}
                        {updatedSuccess && <p className="text-green-500 text-sm mt-4">{updatedSuccess}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;