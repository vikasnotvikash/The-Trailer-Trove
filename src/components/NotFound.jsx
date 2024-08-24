import React from 'react'
import notfound from '/notfound.gif'

const NotFound = () => {
  return (
    <div className='w-1/3 h-1/3 bg-black flex justify-center items-start'>
        <img src={notfound}  className='object-cover w-full h-full'/>
    </div>
  )
}

export default NotFound