import React, { useEffect, useState } from 'react'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import axios from '../utils/axios'
import Header from './partials/Header'
import HorizontalCards from './partials/HorizontalCards'
import Dropdown from './partials/Dropdown'
import Loading from './partials/Loading'

const Home = () => {

    document.title = "Web App | Homepage"
    const [wallpaper, setwallpaper] = useState(null);
    const [trending, setTrending] = useState(null);
    const [category, setcategory] = useState("all");

    const getHeaderWallpaper = async () => {
        try {
            const { data } = await axios.get(`/trending/all/day`)
            let random = data.results[(Math.random() * data.results.length).toFixed()];
            setwallpaper(random)
        }
        catch (e) {
            console.log("Error: ", e);
        }
    }
    // console.log(wallpaper);
    //The condition !wallpaper && getHeaderWallpaper() checks 
    //whether the wallpaper variable is falsy (e.g., null, undefined, or false). 
    //If it is falsy, the getHeaderWallpaper() function is called.
    //If wallpaper is truthy, the effect won’t execute the getHeaderWallpaper() function.


    const GetTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/day`)
            setTrending(data.results);
        }
        catch (e) {
            console.log("Error: ", e);
        }
    }

    useEffect(() => {
        GetTrending();
        !wallpaper && getHeaderWallpaper();
        // !trending && getTrending();
    }, [category])

    console.log(trending);


    return wallpaper && trending ? (
        <>
            <Sidenav />
            <div className='w-[80%] h-full overflow-hidden overflow-y-auto'>
                <Topnav />
                <Header data={wallpaper} />
                <div className='flex justify-between items-center p-4'>
                    <h1 className='text-xl font-semibold text-zinc-400'>
                        Trending
                    </h1>
                    <Dropdown
                        title='Filter'
                        options={["tv", "movie", "all"]}
                        func={(e) => setcategory(e.target.value)}
                    />
                </div>
                <HorizontalCards data={trending} />
            </div>
        </>) :
        <h1>
            <Loading />
        </h1>
}

export default Home