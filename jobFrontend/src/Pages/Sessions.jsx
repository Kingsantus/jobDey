import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://jobdey-api.onrender.com/api/v1/user/sessions', {
            method: 'GET',
            credentials: 'include',  // Include credentials (cookies)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to fetch sessions');
            }
            return res.json();
        })
        .then((data) => {
            setSessions(data.sessions);  // Access sessions from the response
            setIsLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setIsLoading(false);
        });
    }, []);

    const handleSearch = () => {
        const filterItem = sessions.filter((session) => 
            session.userAgent.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
        setSessions(filterItem);
    }

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <div className='my-sessions-container'>
                <h1 className='text-center p-4'>User Sessions</h1>
                <div className='search-box p-2 text-center mb-2'>
                    <input 
                        onChange={(e) => setSearchText(e.target.value)} 
                        type="text" 
                        placeholder='Search Sessions by UserAgent' 
                        name='search' 
                        id='search' 
                        className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full' 
                    />
                    <button 
                        onClick={handleSearch} 
                        className='bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4'>
                        Search
                    </button>
                </div>
            </div>
            {/* table */}
            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">All Sessions</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <Link to="/post-session">
                                        <button className="bg-blue text-white active:bg-blue/45 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                            Post A New Session
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">NO.</th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">User Agent</th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Current Session</th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Delete Session</th>
                                    </tr>
                                </thead>
                                {
                                    isLoading ? (
                                        <div className='flex items-center justify-center h-20'>
                                            <p>Loading...</p>
                                        </div>
                                    ) : (
                                        <tbody>
                                            {sessions.map((session, index) => (
                                                <tr key={session._id}>
                                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                        {index + 1}
                                                    </th>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                        {session.userAgent ? session.userAgent.slice(0, 42) : ''}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {session.isCurrent ? 'Yes' : 'No'}
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <button className='bg-red-600 py-2 px-6 text-white rounded-sm'><Link to={`/delete-job/${session?._id}`}>Delete</Link></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    )
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Sessions;