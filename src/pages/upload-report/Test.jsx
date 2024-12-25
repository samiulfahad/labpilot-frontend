import React from 'react'
import { Link } from 'react-router-dom'

const Test = ({id, name, code}) => {
    // console.log(id);
    return (
      <div>
          <Link state={{code, id}} to={"/upload-report/"+code} className='bg-blue-gray-400 text-white px-4 py-2 rounded'>
              {name}
          </Link>
    </div>
  )
}

export default Test