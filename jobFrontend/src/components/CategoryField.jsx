import React from 'react'

const CategoryField = ({handleChange, categories}) => {
  return (
    <>
      {/* Dynamic Location Options */}
      {categories.map((category, index) => (
        <label key={index} className='sidebar-label-container'>
            <input type="radio" name='test' id='test' value={category} onChange={handleChange} />
            <span className='checkmark'></span>{category}
        </label>
      ))}
    </>
  )
}

export default CategoryField