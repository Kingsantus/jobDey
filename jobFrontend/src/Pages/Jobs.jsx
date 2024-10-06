import React from 'react'

const Jobs = ({result}) => {
  return (
    <>
      <div className='text-lg font-bold mb-2'>{result.length} Jobs</div>
      <section className='card-container'>{result}</section>
    </>
  )
}

export default Jobs