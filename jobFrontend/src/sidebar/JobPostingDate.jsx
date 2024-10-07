import React from 'react'
import PostedDateField from '../components/PostedDateField';

const JobPostingDate = ({handleChange}) => {
    //   current time
    const now = new Date();
    // 24 hours, weekly, monthly time
    const daily = new Date(now - 24 * 60 * 60 * 1000);
    const weekly = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const monthly = new Date(now - 30 * 24 * 60 * 60 * 1000);
    // converting date from json to date to string
    const dailyDateAgo = daily.toISOString().slice(0,10);
    const weeklyDateAgo = weekly.toISOString().slice(0, 10);
    const monthlyDateAgo = monthly.toISOString().slice(0, 10);
  return (
    <div>
      <h4 className='text-lg font-meduim mb-2'>Job Posted Date</h4>
      <div>
            <label className='sidebar-label-container'>
                <input type="radio" name='test' id='test' value="" onChange={handleChange} />
                <span className='checkmark'></span>All Time
            </label>
            <PostedDateField handleChange={handleChange} value={dailyDateAgo} title="Last 24 hours" />
            <PostedDateField handleChange={handleChange} value={weeklyDateAgo} title="Last 7 days" />
            <PostedDateField handleChange={handleChange} value={monthlyDateAgo} title="Last month" />

        </div>
    </div>
  )
}

export default JobPostingDate