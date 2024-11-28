import React from 'react'
import { Link } from 'react-router-dom'
import ReferrerCard from './ReferrerCard'

const AddNew = () => {
  return (
      <section>
      
          <div>
              <div className='w-[450px] mt-8 bg-white rounded-md ml-40'>
                  <ReferrerCard />
              </div>
          </div>
          
      </section>
  )
}

export default AddNew