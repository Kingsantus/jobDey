import React from 'react'
import CategoryField from '../components/CategoryField';

const Category = ({handleChange, jobs}) => {
    // Extract unique locations from jobs data
    const categories = [...new Set(jobs.map((job) => job.category))];
    return (
        <div>
            <h4 className='text-lg font-meduim mb-2'>Category</h4>
            <div>
                <label className='sidebar-label-container'>
                    <input type="radio" name='test' id='test' value="" onChange={handleChange} />
                    <span className='checkmark'></span>All
                </label>
                <CategoryField handleChange={handleChange} categories={categories} />

            </div>
        </div>
    )
}

export default Category