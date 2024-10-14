import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const JobPosted = () => {
    const email = "admin@gmail.com";
    const [jobs, setJobs] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true),
        fetch(`http://localhost:5000/api/v1/post/all-jobs`)
            .then((res) => res.json())
            .then((data) => {
                setJobs(data);
                setIsLoading(false)
            });
    }, []);

    const handleSearch = () => {
        const filterItem = jobs.filter((job) => job.title.toLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1);
        setJobs(filterItem);
        setIsLoading(false);
    }
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
        <div className='my-jobs-container'>
            <h1 className='text-center p-4'>All Jobs Posted</h1>
            <div className='search-box p-2 text-center mb-2'>
                <input onChange={(e) => setSearchText(e.target.value)} type="text" placeholder='Quick Search for Jobs' name='search' id='search' className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full' />
                <button onClick={handleSearch} className='bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4'>Search</button>
            </div>
        </div>
        {/* table */}
        <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-blueGray-700">All Jobs</h3>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                        <Link to="/post-job"><button className="bg-blue text-white active:bg-blue/45 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Post A New Job</button></Link>
                        </div>
                    </div>
                </div>

                <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                    <thead>
                        <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">NO.</th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">TITLE</th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Company Name</th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Job Model</th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">EDIT</th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">DELETE</th>
                        </tr>
                    </thead>
                    {
                        isLoading ? (<div className='flex items-center justify-center h-20'><p>loading.....</p></div>) : (
                            <tbody>
                                {
                                    jobs.map((job, index) => (
                                        <tr key={index}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {index + 1}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                            {job.title}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {job.companyName}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                            {job.jobModel}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <button className='bg-blue py-2 px-6 text-white rounded-sm'><Link to={`/edit-job/${job?._id}`}>Edit</Link></button>
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            <button className='bg-red-600 py-2 px-6 text-white rounded-sm'><Link to={`/delete-job/${job?._id}`}>Delete</Link></button>
                                            </td>
                                        </tr>
                                    ))
                                } 
                            </tbody>
                        )
                    }
                    
                </table>
                </div>
            </div>
            </div>
        </section>
    </div>
  )
}

export default JobPosted