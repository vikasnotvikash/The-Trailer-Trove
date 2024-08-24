import axios from '../../utils/axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import noimage from '/noimage.jpg'

const Topnav = () => {

    const [Query, setQuery] = useState("")
    const [searches, setSearches] = useState([])

    const getSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${Query}`)
            setSearches(data.results)
            // console.log(data)
        }
        catch (e) {
            console.log("Error: ", e);
        }
    }

    useEffect(() => {
        getSearches();
    }, [Query])

    return (
        <div className='w-full h-[10vh] relative flex justify-center items-center'>
            <i className="ri-search-line text-zinc-400 text-3xl"></i>
            <input onChange={(e) => setQuery(e.target.value)}
                value={Query}
                type="text" placeholder='Search'
                className='w-[50%] mx-10 text-xl p-2 outline-0 border-0 text-white-800 rounded-md bg-zinc-700 pl-6'
            />
            {Query.length > 0 && (<i onClick={() => setQuery("")} className="ri-close-fill text-zinc-400 text-3xl"></i>)}
            <div className='w-[50%] mx-[6%] max-h-[35vh] bg-zinc-200 absolute top-[90%] overflow-auto rounded-md z-[100]'>
                {searches.map((item, index) =>
                    <Link to={`/${item.media_type}/details/${item.id}`} key={index} className='hover:text-black hover:bg-zinc-400 duration-300 font-semibold text-zinc-800 w-full p-5 flex justify-start items-center border-b-2 border-zinc-100'>
                        <img className='w-[7vh] h-[7vh] object-cover mr-5 rounded-md shadow'
                        src={item.backdrop_path || item.profile_path ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path}` : noimage }  />
                        <span>{item.original_title || item.name || item.original || item.title}</span>
                    </Link>)}
            </div>
        </div>
    )
}

export default Topnav