import React from 'react'

const InputField = ({handleChange, locations}) => {
  return (
    <>
      {/* Dynamic Location Options */}
      {locations.map((location, index) => (
        <label key={index} className='sidebar-label-container'>
            <input type="radio" name='test' id='test' value={location} onChange={handleChange} />
            <span className='checkmark'></span>{location}
        </label>
      ))}
    </>
  )
}

export default InputField