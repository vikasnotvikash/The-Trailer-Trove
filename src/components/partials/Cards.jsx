import React from 'react'
import { Link } from 'react-router-dom'
import  noimage  from "/noimage.jpg";

const Cards = ({ data, title }) => {

  console.log(title, data);
  return (
    <div className='flex flex-wrap w-full h-full p-[5%] gap-10 bg-[#1F1E24]'>
      {data.map((item, index) =>
        <Link to={`/${item.media_type || title}/details/${item.id}`} className='w-[25vh] relative' key={index}>
          <img src={item.poster_path || item.backdrop_path || item.profile_path ? `https://image.tmdb.org/t/p/original/${item.poster_path || item.backdrop_path || item.profile_path}` : noimage }
            className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[40vh] object-cover' />
          <h1 className='text-2xl text-zinc-300 mt-3 font-semibold'>
            {item.original_title || item.name || item.original || item.title}
          </h1>
          {item.vote_average && <div className='absolute right-[2%] bottom-[30%] font-semibold bg-yellow-600 w-[5vh] h-[5vh] flex justify-center items-center rounded-full'>
            {(item.vote_average * 10).toFixed()}%
          </div>}
        </Link>)}
    </div>
  )
}

export default Cards