import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ data }) => {

    // console.log(data)

    return (
        <div style={{
            background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.9)),
            url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path}`,
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}
            className='w-full h-[50vh] flex flex-col justify-end p-[2%] gap-4'>
            <h1
                className='w-[70%] text-3xl font-medium text-white'>{data.original_title || data.name || data.original || data.title}
            </h1>
            <p className='w-[70%]'>
                {data.overview.slice(0, 200)}
                ...<Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-400'>more
                </Link></p>
            <div className='flex'>
                <p className='w-full flex gap-2'>
                    <i className="ri-megaphone-fill text-yellow-600"></i>{data.release_date || "No Info."}
                    <i className="ml-[1%] ri-album-fill text-yellow-600"></i>{data.media_type.toUpperCase()}
                </p>
            </div>
            <Link to={`${data.media_type}/details/${data.id}/trailer`} className='w-[13%] bg-[#6556CD] p-2 text-center rounded font-semibold'>
                Watch Trailer
            </Link>
        </div>
    )
}

export default Header