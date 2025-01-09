import React, { useState } from 'react'

const CBC = () => {
    const [data, setData] = useState({})
  return (
      <div>
          <div className='flex w-96'>
              <p>Value 1</p>
              <input type='number' />
              
          </div>     
      </div>
  )
}

export default CBC