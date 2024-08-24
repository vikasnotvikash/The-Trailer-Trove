import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadperson } from '../Store/actions/personActions';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { removeperson } from '../Store/reducers/personSlice';
import Loading from './partials/Loading';
import HorizontalCards from './partials/HorizontalCards';
import Dropdown from './partials/Dropdown';


const persondetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie")

  const { info } = useSelector(state => state.person)


  useEffect(() => {
    dispatch(asyncloadperson(id))
    return () => {
      dispatch(removeperson())
    }
  }, [id])


  return info ? (
    <div className='px-[5%] w-screen flex flex-col bg-[#1F1E24] h-[300vh]'>

      {/* Navbar */}
      <nav className='h-[10vh] items-center w-full text-zinc-100 flex gap-10 text-xl mb-5'>
        <Link onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line mr-[10%]">
        </Link>
        <div className='flex gap-10 w-full justify-end'>
        </div>
      </nav>


      <div className='w-full flex'>


        {/* left Poster details */}
        <div className='w-[20%]'>
          <img src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] 
          h-[50vh] object-cover'
          />
          <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-500' />
          {/* Social media links */}
          <div className='text-2xl gap-x-5 flex'>
            <a className='hover:text-[#6566CD]' target='_blank' href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}><i className="ri-earth-fill"></i></a>
            <a className='hover:text-[#6566CD]' target='_blank' href={`https://www.facebook.com/${info.externalId.facebook_id}`}><i className="ri-facebook-circle-fill"></i></a>
            <a className='hover:text-[#6566CD]' target='_blank' href={`https://www.instagram.com/${info.externalId.instagram_id}`}><i className="ri-instagram-fill"></i></a>
            <a className='hover:text-[#6566CD]' target='_blank' href={`https://www.twitter.com/${info.externalId.twitter_id}`}><i className="ri-twitter-x-fill"></i></a>
          </div>

          {/* Personal info. */}
          <h1 className='text-2xl text-zinc-400 font-semibold my-5'>Personal Info.</h1>
          <h1 className='text-lg text-zinc-400 font-semibold'>Known for</h1>
          <h1 className='text-zinc-400'>
            {info.detail.known_for_department}
          </h1>
          <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Gender</h1>
          <h1 className='text-zinc-400'>
            {info.detail.gender === 2 ? 'Male' : 'Female'}
          </h1>
          <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Birthday</h1>
          <h1 className='text-zinc-400'>
            {info.detail.birthday}
          </h1>
          <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Deathday</h1>
          <h1 className='text-zinc-400'>
            {info.detail.deathday ? info.detail.deathday : 'Still Alive'}
          </h1>
          <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Place Of Birth</h1>
          <h1 className='text-zinc-400'>
            {info.detail.place_of_birth}
          </h1>
          <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Also Known As</h1>
          <h1 className='text-zinc-400'>
            {info.detail.also_known_as.join(',')}
          </h1>
        </div>


        {/* Right info. */}
        <div className='w-[80%] ml-[5%]'>
          <h1 className='text-6xl text-zinc-400 font-black mb-8'>{info.detail.name}</h1>
          <h1 className='text-lg text-zinc-400 font-semibold mb-2 underline'>Biography</h1>
          <p className='text-zinc-400'>
            {info.detail.biography}
          </p>
          <h1 className='text-lg text-zinc-400 font-semibold mt-2 underline'>Famous for</h1>

          <HorizontalCards data={info.combinedCredits.cast} />

          <div className='w-full flex justify-between mt-10'>
            <h1 className='text-xl text-zinc-400 font-semibold mb-2 underline'>Acting</h1>
            <Dropdown title="Category" options={["tv", "movie"]} func={(e) => setcategory(e.target.value)} />
          </div>
          
          <div className='list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-lg 
          shadow-[rgba(255,255,255,0.3)] mt-5 border-2 border-zinc-800 p-5'>

            {info[category + "Credits"].cast.map((cast, index) => (
              <li key={index} className='hover:text-white duration-300 cursor-pointer p-4'>
                <Link to={`/${category}/details/${cast.id}`}>
                  <span className='text-xl'>Work - {cast.name
                    || cast.title
                    || cast.original_name
                    || cast.original_title}</span>
                  <span className='block ml-[2.5%]'>{cast.character && `Character name - ${cast.character}`}</span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>

    </div>
  ) : (
    <Loading />
  )
}

export default persondetails