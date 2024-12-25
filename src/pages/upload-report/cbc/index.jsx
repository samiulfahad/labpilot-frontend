import React from 'react'
import { useLocation } from 'react-router-dom'

const index = () => {
    const { code, id } = useLocation().state
    console.log(code, id);
  return (
    <div>Upload CBC</div>
  )
}

export default index