import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import axios from '../utils/axios'
import Cards from './partials/Cards'
import Loading from './partials/Loading'
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {

    const navigate = useNavigate()
    const [category, setcategory] = useState("all")
    const [duration, setduration] = useState("day")
    const [trending, settrending] = useState([])
    const [page, setpage] = useState(1);
    const [hasmore, sethasmore] = useState(true)

    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`)
            if(data.results.length > 0) {
                settrending((prevState) => [...prevState, ...data.results]);
                setpage(page + 1)
            }
            else{
                sethasmore(false);
            }
        }
        catch (e) {
            console.log("Error: ", e);
        }
    }

    const refreshHandler = () => {
        if (trending.length === 0) {
            GetTrending();
        }
        else {
            setpage(1);
            settrending([]);
            GetTrending();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [duration, category])


    
    document.title = 'Trending |' +" " + category.toLocaleUpperCase();

    return trending.length > 0 ? (
        <div className='w-screen h-screen'>
            <div className='w-full flex justify-center items-center p-[2%]'>
                <h1 className='text-2xl text-zinc-400 font-semibold w-[20%]'>
                    <i onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line mr-[10%]">
                    </i>Trending
                </h1>
                <div className='flex items-center w-full'>
                    <Topnav />
                    <Dropdown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)} />
                    <div className='w-[2%]'></div>
                    <Dropdown title="Duration" options={["week", "day"]} func={(e) => setduration(e.target.value)} />
                </div>
            </div>

            <InfiniteScroll
                loader={<h1>Loading...</h1>}
                next={GetTrending}
                hasMore={hasmore}
                dataLength={trending.length}>
                <Cards data={trending} title={category} />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    )

}

export default Trending