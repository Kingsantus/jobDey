import React from 'react'
import EmploymentField from '../components/EmploymentField';

const EmploymentType = ({handleChange, jobs}) => {
  // Extract unique locations from jobs data
  const employTypes = [...new Set(jobs.map((job) => job.employmentType))];
  return (
    <div>
      <h4 className='text-lg font-meduim mb-2'>Employment Type</h4>
      <div>
            <label className='sidebar-label-container'>
                <input type="radio" name='test' id='test' value="" onChange={handleChange} />
                <span className='checkmark'></span>All
            </label>
            <EmploymentField handleChange={handleChange} employTypes={employTypes} />

        </div>
    </div>
  )
}

export default EmploymentType