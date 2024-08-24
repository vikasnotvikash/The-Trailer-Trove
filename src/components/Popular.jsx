import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Loading from './partials/Loading'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import Cards from './partials/Cards'

const Popular = () => {

    const navigate = useNavigate()
    const [category, setcategory] = useState("movie")
    const [popular, setpopular] = useState([])
    const [page, setpage] = useState(1);
    const [hasmore, sethasmore] = useState(true)


    const GetPopular = async () => {
        try {
            const { data } = await axios.get(`${category}/popular?page=${page}`)
            // console.log(data);
            if (data.results.length > 0) {
                setpopular((prevState) => [...prevState, ...data.results]);
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
        if (popular.length === 0) {
            GetPopular();
        }
        else {
            setpage(1);
            setpopular([]);
            GetPopular();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category])

    document.title = 'Popular |' +" " + category.toLocaleUpperCase();

    return popular.length > 0 ? (
        <div className='w-screen h-screen'>
            <div className='w-full flex justify-center items-center p-[2%]'>
                <h1 className='text-2xl text-zinc-400 font-semibold w-[20%]'>
                    <i onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line mr-[10%]">
                    </i>Popular
                </h1>
                <div className='flex items-center w-full'>
                    <Topnav />
                    <Dropdown title="Category" options={["tv", "movie"]} func={(e) => setcategory(e.target.value)} />
                </div>
            </div>

            <InfiniteScroll
                loader={<h1>Loading...</h1>}
                next={GetPopular}
                hasMore={hasmore}
                dataLength={popular.length}>
                <Cards data={popular} title={category} />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    )
}

export default Popular