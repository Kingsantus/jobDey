import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector"

const PostJob = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [country, setCountry] = useState('');
  const onSubmit = (data) => {
    console.log({...data, country});
  };
  
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
        {/* form for post infomation */}
        <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* first row information */}
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'> Job Title</label>
              <input type="text" placeholder='Job Title' {...register("title", {required: true, maxLength: 100})} className='create-job-input' />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'> Company Name</label>
              <input type="text" placeholder='Company offering job' {...register("companyName", {required: true, maxLength: 100})} className='create-job-input' />
            </div>
          </div>
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'> Job Link</label>
              <input type="url" placeholder='Link to the posting website' {...register("url", {required: true})} className='create-job-input' />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Employment Type</label>
              <select {...register("employmentType", {required: true})} className='create-job-input'>
              <option value="">Select Type of Job</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Location</label>
              <CountryDropdown value={country} onChange={(val) => {
                setCountry(val);
                setValue("country", val, { shouldValidate: true });
              }}  className='create-job-input' />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Category</label>
              <input type="text" placeholder='Category of the job' {...register("category", {required: true, maxLength: 80})} className='create-job-input' />
            </div>
          </div>
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Work Model</label>
                <select {...register("jobModel", {required: true})} className='create-job-input'>
                <option value="">Model of Job</option>
                  <option value="on-site">On-Site</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Date Posted</label>
              <input type="date" placeholder='Date Job is Posted on website' {...register("postedDate", {required: true, maxLength: 30})} className='create-job-input' />
            </div>
          </div>
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Company Logo</label>
              <input type="url" placeholder='Link to image of comapany' {...register("imageURL", {required: true})} className='create-job-input' />
            </div>
          </div>
          {errors.exampleRequired && <span>This field is required</span>}
          <input className='bg-blue text-white block mt-12 font-semibold px-8 py-2 rounded-sm cursor-pointer' type="submit" />
        </form>
        </div>
    </div>
  )
}

export default PostJob