import React from 'react';
import { FaEnvelopeOpenText, FaNewspaper, FaRocket } from "react-icons/fa6"

const NewsLetter = () => {
  return (
    <div>
        <div className='mb-6'>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                <FaEnvelopeOpenText />
                Notify Me for Jobs
            </h3>
            <p className='text-primary/75 textbase mb-4'>To get notified any time a new job is posted subscribe to the mail box. Remember your skill set alone will not give you the job if you don't show up. No Company will look for you, just because you have a skill.</p>
            <div className='w-full space-y-4'>
                <input type="email" name="email" id="email" placeholder="name@mail.com" className='w-full block py-2 pl-3 border focus:outline-none' />
                <input type="submit" value={"subscribe"} className='bg-blue text-white rounded-sm cursor-pointer font-semibold focus:outline-none border pl-3 py-2 block w-full' />
            </div>
        </div>
        {/* second item */}
        <div className='mb-4'>
            <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
                <FaNewspaper />
                Tech Update From Daily.Dev
            </h3>
            <p className='text-primary/75 textbase mb-4'>Great happening in Slicon Vally</p>
            <div className='w-full space-y-4'>
                <input type="submit" value={"Read More"} className='bg-blue text-white rounded-sm cursor-pointer font-semibold focus:outline-none border pl-3 py-2 block w-full' />
            </div>
        </div>
    </div>
  )
}

export default NewsLetter