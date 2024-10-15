import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const VerifyEmail = () => {
  const { code } = useParams();  // Get the verification code from the URL
  const [verificationStatus, setVerificationStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);  // Track if the request has been made

  useEffect(() => {
    // Only fetch verification if it hasn't been fetched yet
    if (code && !isVerified) {
      const fetchVerificationData = async () => {
        try {
          // Sending GET request to the backend with the verification code in the URL
          const response = await fetch(`https://jobdey-api.onrender.com/api/v1/auth/verify-email/${code}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();

          if (response.ok) {
            setVerificationStatus('Account Verified');
          } else {
            setErrorMessage(data.message || 'Verification failed. Invalid or expired code.');
          }
          setIsVerified(true);  // Set as verified to prevent further requests
        } catch (error) {
          setErrorMessage('An error occurred while verifying your account. Please try again later.');
          setIsVerified(true);  // Set as verified even on error to prevent multiple attempts
        }
      };

      fetchVerificationData();
    }
  }, [code, isVerified]);  // isVerified ensures the request only runs once

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className="flex min-h-screen items-center justify-center px-6 py-8 lg:px-8">
        <div className="text-center">
          {verificationStatus ? (
            <>
              <h2 className="text-2xl font-bold text-green-600">{verificationStatus}</h2>
              <Link to="/login">
                <button className="mt-4 bg-blue text-white px-4 py-2 rounded">
                  You can login now
                </button>
              </Link>
            </>
          ) : errorMessage ? (
            <>
              <h2 className="text-2xl font-bold text-red-600">{errorMessage}</h2>
              <Link to="/signup">
                <button className="mt-4 bg-blue text-white px-4 py-2 rounded">
                  Register again
                </button>
              </Link>
            </>
          ) : (
            <h2 className="text-2xl font-bold">Verifying your account...</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;