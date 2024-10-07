import React from 'react'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
      <footer className="w-full bg-white py-6">
        <div className="container mx-auto px-4 max-w-screen-2xl xl:px-24">
          <div className="grid justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className="mb-4">
            <a href="/" className='flex items-center gap-2 text-2xl text-black'><img className='footer-logo-img' src="./images/jobdey-logo.svg" alt="jobDey Logo" />
                  <span className='text-blue font-bold text-[20px]'>JobDey</span>
                  </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <h2 className="mb-4 font-bold text-gray-700">About</h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="./about" className='text-gray-600 hover:underline'>JobDey</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 font-bold text-gray-700">Follow Us</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="https://facebook.com" className="text-gray-600 hover:underline">Facebook</a>
                  </li>
                  <li>
                    <a href="https://x.com" className="text-gray-600 hover:underline">Twitter</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 font-bold text-gray-700">Legal</h2>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-600 hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:underline">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto" />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center">
              © 2024 <a href="#" className="hover:underline">JobDey™</a>. All Rights Reserved.
            </span>
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <a href="https://facebook.com" className="text-gray-500 hover:text-gray-900"><BsFacebook /></a>
              <a href="https://x.com" className="text-gray-500 hover:text-gray-900">
                <BsTwitter />
              </a>
              <a href="https://instagram.com" className="text-gray-500 hover:text-gray-900">
                <BsInstagram />
              </a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer