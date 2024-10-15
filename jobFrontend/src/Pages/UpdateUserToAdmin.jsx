import React, { useEffect, useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const UpdateUserToAdmin = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null); 
  const [error, setError] = useState(null);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [country, setCountry] = useState(''); // To store country data

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/post/all-jobs/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch job data');
        }

        const jobData = await response.json();
        setJob(jobData.post); // Set the fetched job data to state
        setCountry(jobData.post.country); // Pre-fill country dropdown

        // Pre-fill form fields with the job data
        Object.keys(jobData.post).forEach(key => {
          setValue(key, jobData.post[key]);
        });
      } catch (error) {
        console.error('Error fetching job data:', error);
        setError(error.message); // Set error message to state
      }
    };

    fetchJobData(); // Call the fetch function
  }, [id, setValue]); // Added setValue to ensure form updates


  // Render loading state or error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>; // Display loading while data is fetched
  }

  const onSubmit = async (data) => {
    try {
      // Make the fetch request with await
      const response = await fetch(`http://localhost:5000/api/v1/post/update/${id}`, {
        method: "PUT",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      // Parse the JSON response
      const result = await response.json();
  
      // Check if the update was successful
      if (result.success) {
        alert("Job Updated Successfully!");
        reset();  // Reset the form
      } else {
        alert("Error updating the job");
      }
    } catch (err) {
      // Handle any errors that occur during the fetch
      alert("An error occurred while updating the job.");
      console.error(err);
    }
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
              <input type="text" defaultValue={job.title} {...register("title", {required: true, maxLength: 100})} className='create-job-input' />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'> Company Name</label>
              <input type="text" defaultValue={job.companyName} {...register("companyName", {required: true, maxLength: 100})} className='create-job-input' />
            </div>
          </div>
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'> Job Link</label>
              <input type="url" defaultValue={job.url} {...register("url", {required: true})} className='create-job-input' />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Employment Type</label>
              <select defaultValue={job.employmentType} {...register("employmentType", {required: true})} className='create-job-input'>
              <option value={job.employmentType}>{job.employmentType}</option>
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
              <CountryDropdown 
                value={country} 
                onChange={(val) => {
                  setCountry(val);
                  setValue("country", val, { shouldValidate: true });
                }}  
                className='create-job-input' 
              />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Category</label>
              <input type="text" defaultValue={job.category} {...register("category", {required: true, maxLength: 80})} className='create-job-input' />
            </div>
          </div>
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Work Model</label>
                <select {...register("jobModel", {required: true})} className='create-job-input'>
                <option value={job.jobModel}>{job.jobModel}</option>
                  <option value="on-site">On-Site</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Date Posted</label>
              <input type="date" {...register("postedDate", {required: true, maxLength: 30})} className='create-job-input' />
            </div>
          </div>
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-lg'>Job Visibility</label>
                <select {...register("visibility", {required: true})} className='create-job-input'>
                <option value={job.visibility}>{job.visibility}</option>
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Company Logo</label>
              <input type="url" defaultValue={job.imageURL} {...register("imageURL", {required: true})} className='create-job-input' />
            </div>
          </div>
          {errors.exampleRequired && <span>This field is required</span>}
          <input className='bg-blue text-white block mt-12 font-semibold px-8 py-2 rounded-sm cursor-pointer' type="submit" />
        </form>
        </div>
    </div> 
  );
};

export default UpdateUserToAdmin;