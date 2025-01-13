import React from 'react'
import { useAuth } from '../../context/auth'
import { useLocation } from 'react-router-dom'

const Login = () => {
  const { login } = useAuth()
  const { state } = useLocation()
 
  
  const adminLogin = () => {
    login({userName: 'admin', role: ['admin']})
  }

  const userLogin = () => {
    login({userName: 'other', role: ['invoice']})
  }

  return (
      <section>
          <div className='flex justify-center items-center h-screen space-x-4'>
              <button className='btn' onClick={adminLogin}>Login As Admin</button>
              <button className='btn' onClick={userLogin}>Login As User</button>
          </div>
    </section>
  )
}

export default Login