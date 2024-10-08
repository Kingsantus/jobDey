import React from 'react'
import Location from './Location'
import EmploymentType from './EmploymentType'
import JobPostingDate from './JobPostingDate'
import Category from './Category'

const Sidebar = ({handleChange, handleClick, jobs}) => {
  return (
    <div className='space-y-4'>
        <h3 className='text-lg font-bold mb-2'>Filters</h3>
        <Location handleChange={handleChange} jobs={jobs} />
        <EmploymentType handleChange={handleChange} jobs={jobs} />
        <JobPostingDate handleChange={handleChange} />
        <Category handleChange={handleChange} jobs={jobs} />
    </div>
  )
}

export default Sidebar