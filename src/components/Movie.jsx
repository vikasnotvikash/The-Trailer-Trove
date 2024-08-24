import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Loading from './partials/Loading'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import Cards from './partials/Cards'

const Movie = () => {
    const navigate = useNavigate()
    const [category, setcategory] = useState("now_playing")
    const [movie, setmovie] = useState([])
    const [page, setpage] = useState(1);
    const [hasmore, sethasmore] = useState(true)


    const GetMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`)
            // console.log(data);
            if (data.results.length > 0) {
                setmovie((prevState) => [...prevState, ...data.results]);
                setpage(page + 1)
            }
            else {
                sethasmore(false);
            }
        }
        catch (e) {
            console.log("Error: ", e);
        }
    }

    const refreshHandler = () => {
        if (movie.length === 0) {
            GetMovie();
        }
        else {
            setpage(1);
            setmovie([]);
            GetMovie();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category])

    document.title = 'Movies |' +" " + category.toLocaleUpperCase();

  return movie.length > 0 ? (
    <div className='w-screen h-screen'>
        <div className='w-full flex justify-center items-center p-[2%]'>
            <h1 className='text-2xl text-zinc-400 font-semibold w-[20%]'>
                <i onClick={() => navigate(-1)}
                    className="hover:text-[#6556CD] ri-arrow-left-line mr-[10%]">
                </i>Movie<small className='ml-2 text-zinc-500' >{category}</small>
            </h1>
            <div className='flex items-center w-full'>
                <Topnav />
                <Dropdown title="Category" options={["popular", "top_rated","upcoming","now_playing"]} func={(e) => setcategory(e.target.value)} />
            </div>
        </div>

        <InfiniteScroll
            loader={<h1>Loading...</h1>}
            next={GetMovie}
            hasMore={hasmore}
            dataLength={movie.length}>
            <Cards data={movie} title="movie" />
        </InfiniteScroll>
    </div>
) : (
    <Loading />
)
}

export default Movie