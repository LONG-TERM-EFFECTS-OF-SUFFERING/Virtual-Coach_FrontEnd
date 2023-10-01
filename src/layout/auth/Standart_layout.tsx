import React from 'react'
import { Outlet } from 'react-router-dom'

const Standart_layout = () => {
  return (
        <div className='bg-gray-800 min-h-screen flex items-center justify-center p-6'>
          <Outlet/>
        </div>
      )
}

export default Standart_layout