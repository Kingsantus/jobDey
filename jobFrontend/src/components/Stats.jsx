import React from 'react';

const Stats = () => {
  return (
    <div className="flex flex-col mb-4 items-center p-4 max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <h3 className="text-3xl font-bold text-gray-900 mb-6">Where to Upskill</h3>
      
      {/* Card Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">

        {/* Card 1 */}
        <div className="bg-gray-300 shadow-md rounded-lg p-4 h-full">
          <a href="https://www.alxafrica.com/" className="block">
            <h5 className="text-xl font-bold text-gray-900 mb-2">ALX</h5>
            <p className="text-gray-700">Transform your career with industry-leading tech programs.</p>
          </a>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-300 shadow-md rounded-lg p-4 h-full">
          <a href="https://www.coursera.org/" className="block">
            <h5 className="text-xl font-bold text-gray-900 mb-2">Coursera</h5>
            <p className="text-gray-700">Access courses from top universities and tech companies worldwide.</p>
          </a>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-300 shadow-md rounded-lg p-4 h-full">
          <a href="https://www.codecademy.com/" className="block">
            <h5 className="text-xl font-bold text-gray-900 mb-2">Codecademy</h5>
            <p className="text-gray-700">Interactive and hands-on coding lessons to help you master programming skills.</p>
          </a>
        </div>

        {/* Card 4 */}
        <div className="bg-gray-300 shadow-md rounded-lg p-4 h-full">
          <a href="https://www.udemy.com/" className="block">
            <h5 className="text-xl font-bold text-gray-900 mb-2">Udemy</h5>
            <p className="text-gray-700">Learn at your own pace with affordable courses taught by industry experts.</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Stats;