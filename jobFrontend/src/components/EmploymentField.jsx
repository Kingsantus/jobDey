import React from 'react'

const EmploymentField = ({handleChange, employTypes}) => {
  return (
    <>
      {/* Dynamic Location Options */}
      {employTypes.map((employType, index) => (
        <label key={index} className='sidebar-label-container'>
            <input type="radio" name='test' id='test' value={employType} onChange={handleChange} />
            <span className='checkmark'></span>{employType}
        </label>
      ))}
    </>
  )
}

export default EmploymentField