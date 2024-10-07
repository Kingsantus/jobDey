import React from 'react'

const PostedDateField = ({handleChange, value, title}) => {
    
  return (
    <label className='sidebar-label-container'>
        <input type="radio" name='test' id='test' value={value} onChange={handleChange} />
        <span className='checkmark'></span>{title}
    </label>
  )
}

export default PostedDateField