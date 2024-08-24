import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotFound from '../NotFound'

const Trailer = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv"
    const ytVideo = useSelector((state) => state[category].info.videos);
    console.log(pathname, ytVideo);

    return (
        <div className='bg-[rgba(0,0,0,.7)] w-screen top-0 left-0 h-screen absolute flex items-center justify-center'>
            <Link onClick={() => navigate(-1)}
                className="absolute hover:text-[#6556CD] ri-close-fill mr-[10%] text-3xl text-white top-[5%] right-[5%]">
            </Link>
            {ytVideo ? (
                <ReactPlayer
                controls
                    url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
                />
            ) : (
                <NotFound />
            )}
        </div>    
    )
}

            export default Trailer