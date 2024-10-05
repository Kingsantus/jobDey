import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("jobs.json").then(res => res.json()).then(data => {
      setJobs(data)
    })
  }, []);
  
//  handle input change
  const [query, setOuery] = useState("");
  const handleInputChange = (event) => {
    setOuery(event.target.value)
  }

  // filter jobs by title
  const filteredItems = jobs.filter((job) => job.title.toLowerCase().indexOf(query.toLocaleLowerCase()) !== -1)
  
  // radio filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  }
  // button based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value)
  }
  // main function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    if (query) {
      filteredJobs = filteredItems
    }
    // category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(({location, employmentType, postedDate}) => {
        location.toLocaleLowerCase() === selected.toLocaleLowerCase() ||
        employmentType.toLocaleLowerCase() === selected.toLocaleLowerCase() ||
        postedDate === selected
      });
      console.log(filteredJobs)
    }
  }

  return (
    <Banner query={query} handleInputChange={handleInputChange}/>
  )
}

export default Home