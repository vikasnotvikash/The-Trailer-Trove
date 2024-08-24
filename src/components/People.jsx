import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import Loading from './partials/Loading'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import Cards from './partials/Cards'

const People = () => {


    const navigate = useNavigate()
    const [category, setcategory] = useState("popular")
    const [person, setperson] = useState([])
    const [page, setpage] = useState(1);
    const [hasmore, sethasmore] = useState(true)


    const GetPerson = async () => {
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`)
            // console.log(data);
            if (data.results.length > 0) {
                setperson((prevState) => [...prevState, ...data.results]);
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
        if (person.length === 0) {
            GetPerson();
        }
        else {
            setpage(1);
            setperson([]);
            GetPerson();
        }
    }

    useEffect(() => {
        refreshHandler();
    }, [category])

    document.title = 'People'
    return person.length > 0 ? (
        <div className='w-screen h-screen'>
            <div className='w-full flex justify-center items-center p-[2%]'>
                <h1 className='text-2xl text-zinc-400 font-semibold w-[20%]'>
                    <i onClick={() => navigate(-1)}
                        className="hover:text-[#6556CD] ri-arrow-left-line mr-[10%]">
                    </i>People
                </h1>
                <div className='flex w-full mx-auto pr-[20%]'>
                    <Topnav />
                </div>
            </div>

            <InfiniteScroll
                loader={<h1>Loading...</h1>}
                next={GetPerson}
                hasMore={hasmore}
                dataLength={person.length}>
                <Cards data={person} title="person" />
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    )
}

export default People