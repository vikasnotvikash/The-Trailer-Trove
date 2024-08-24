import React from 'react'
import loaderr from '/loaderr.gif'

const Loading = () => {
  return (
    <div className='w-screen h-screen bg-black flex justify-center items-start'>
        <img src={loaderr}  className='object-cover w-full h-full'/>
    </div>
  )
}

export default Loading