import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Card from '../components/Card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar';
import NewsLetter from '../components/NewsLetter';

const Home = () => {
  console.log("Home component rendered");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:5000/api/v1/post/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
    })
  }, []);
  
//  handle input change
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }

  // filter jobs by title
  const filteredItems = jobs.filter((job) => job.title.toLowerCase().indexOf(query.toLocaleLowerCase()) !== -1)
  
  // radio filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log(event.target.value);
  }
  // button based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value)
  }

  // calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {startIndex, endIndex};
  }

  // function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  // function for the previous page
  const prevPage = () => {
    if (currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }

  // main function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    if (query) {
      filteredJobs = filteredItems
    }
    // category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(({ country, employmentType, postedDate, category }) => {
        return (
          country.toLocaleLowerCase() === selected.toLocaleLowerCase() ||
          employmentType.toLocaleLowerCase() === selected.toLocaleLowerCase() ||
          category.toLocaleLowerCase() === selected.toLocaleLowerCase() ||
          postedDate >= selected
        )
      });
    }
    
    // slice the data based on current page
    const {startIndex, endIndex} = calculatePageRange();
    // filter jobs
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <Card key={i} data={data}/>)
  }


  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange}/>
      {/* main components */}
      <div className='bg-[#fafafa] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        {/* left side */}
        <div className='bg-white p-4 rounded'>
          <Sidebar handleChange={handleChange} handleClick={handleClick} jobs={jobs} />
        </div>
      {/* job card */}
        <div className='col-span-2 bg-white p-4 rounded-sm'>
          {
            isLoading ? (<p className='font-medium'>Loading......</p>) : result.length > 0 ? (<Jobs result={result} />) : <>
            <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
            <p>No Data Found!</p>
            </>
          }
          {/* pagination here */}
          {
            result.length > 0 ? (
              <div className='flex justify-center mt-4 space-x-8'>
                <button onClick={prevPage} disabled={currentPage === 1} className='hover:underline'>Prev</button>
                <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                <button disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} onClick={nextPage} className='hover:underline'>Next</button>
              </div>
            ) : ""
          }
        </div>
      {/* right side */}
        <div className='bg-white p-4 rounded'>
          <NewsLetter />
        </div>
      </div>
    </div>
  )
}

export default Home