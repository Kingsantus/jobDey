import React from 'react'
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi"

const Card = ({data}) => {
    const {companyName, title, url, postedDate, location, imageURL, employmentType} = data;
  return (
    // main content
    <section className='card'>
        <a href={url} className='flex gap-4 flex-col sm:flex-row items-start'>
            <img src={imageURL} alt={companyName} className='img-size'/>
            <div>
                <h4 className='text-primary mb-1'>{companyName}</h4>
                <h3 className='text-lg font-semibold mb-2'>{title}</h3>
                <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
                    <span className='flex items-center gap-2'><FiMapPin/> {location}</span>
                    <span className='flex items-center gap-2'><FiClock/> {employmentType}</span>
                </div>
                <p className='text-base text-primary/90'><span className='flex items-center gap-2'><FiCalendar/> {postedDate}</span></p>
            </div>
        </a>
    </section>
  )
}

export default Card