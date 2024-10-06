import React from 'react'
import InputField from '../components/InputField'

const Location = ({handleChange, jobs}) => {
  // Extract unique locations from jobs data
  const locations = [...new Set(jobs.map((job) => job.location))];
  return (
    <div>
        <h4 className='text-lg font-medium mb-2'>Location</h4>
        <div>
            <label className='sidebar-label-container'>
                <input type="radio" name='test' id='test' value="" onChange={handleChange} />
                <span className='checkmark'></span>All
            </label>
            <InputField handleChange={handleChange} locations={locations} />

        </div>
    </div>
  )
}

export default Location