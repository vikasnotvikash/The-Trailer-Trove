import React from 'react'
import { Link } from 'react-router-dom'
import noimage  from "/noimage.jpg";

const HorizontalCards = ({ data }) => {
    return (
        <div className='w-[100%] flex overflow-y-hidden p-5'>
            {data.length > 0 ? data.map((item, index) => {
                return <Link to={`/${item.media_type}/details/${item.id}`} key={index} className='text-white min-w-[20%] mr-5 bg-zinc-900 mb-5'>
                    <img className='w-full h-[55%] object-cover'
                        src={ item.backdrop_path || item.poster_path ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.poster_path}` : noimage } />
                    <div className='p-1.5 h-[55%]'>
                        <h1 className='text-xl font-semibold mt-1'>
                            {item.title || item.original_title || item.name || item.original_name}
                        </h1>
                        <p className='mt-3 mb-2 text-sm'>
                            {item.overview.slice(0, 50)}
                            ...<span className='text-zinc-400'>more
                            </span>
                        </p>
                    </div>
                </Link >
            }) : <h1 className='text-white text-3xl text-center mt-5'>Nothing to show</h1> }
        </div>
    )
}

export default HorizontalCards