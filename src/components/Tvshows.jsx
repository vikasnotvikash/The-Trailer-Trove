import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Loading from './partials/Loading'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import Cards from './partials/Cards'


const Tvshows = () => {

    const navigate = useNavigate()
    const [category, setcategory] = useState("airing_today")
    const [tv, settv] = useState([])
    const [page, setpage] = useState(1);
    const [hasmore, sethasmore] = useState(true)


    const GetTv = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`)
            // console.log(data);
            if (data.results.length > 0) {
                settv((prevState) => [...prevState, ...data.results]);
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
        if (tv.length === 0) {
            GetTv();
        }
        else {
            setpage(1);
            settv([]);
            GetTv();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category])

    document.title = 'Tv Shows |' +" " + category.toLocaleUpperCase();

  return tv.length > 0 ? (
    <div className='w-screen h-screen'>
        <div className='w-full flex justify-center items-center p-[2%]'>
            <h1 className='text-2xl text-zinc-400 font-semibold w-[20%]'>
                <i onClick={() => navigate(-1)}
                    className="hover:text-[#6556CD] ri-arrow-left-line mr-[10%]">
                </i>TV shows<small className='ml-2 text-zinc-500 text-sm' >{category}</small>
            </h1>
            <div className='flex items-center w-full'>
                <Topnav />
                <Dropdown title="Category" options={["on_the_air", "top_rated","popular","airing_today"]} func={(e) => setcategory(e.target.value)} />
            </div>
        </div>

        <InfiniteScroll
            loader={<h1>Loading...</h1>}
            next={GetTv}
            hasMore={hasmore}
            dataLength={tv.length}>
            <Cards data={tv} title="tv" />
        </InfiniteScroll>
    </div>
) : (
    <Loading />
)
}

export default Tvshows