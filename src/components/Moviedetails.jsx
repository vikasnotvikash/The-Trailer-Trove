import { useEffect } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadMovie } from '../Store/actions/movieActions';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { removemovie } from '../Store/reducers/movieSlice';
import Loading from './partials/Loading';
import HorizontalCards from './partials/HorizontalCards';

const moviedetails = () => {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { info } = useSelector(state => state.movie)


  useEffect(() => {
    dispatch(asyncloadMovie(id))
    return () => {
      dispatch(removemovie())
    }
  }, [id])


  return info ? (
    <div style={{
      background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.9)),
      url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path}`,
      backgroundPosition: 'top center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }} className='w-screen h-[185vh] px-[10%] overflow-hidden relative'>

      {/* Part 1 Navigation  */}

      <nav className='h-[10vh] items-center w-full text-zinc-100 flex gap-10 text-xl'>
        <Link onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line mr-[10%]">
        </Link>
        <div className='flex gap-10 w-full justify-end'>
          <a className='hover:text-[#6566CD]' target='_blank' href={info.detail.homepage}><i className="ri-earth-fill"></i></a>
          <a className='hover:text-[#6566CD]' target='_blank' href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}><i className="ri-external-link-fill"></i></a>
          <a className='hover:text-[#6566CD]' target='_blank' href={`https://www.imdb.com/title/${info.externalId.imdb_id}/`}>Imdb</a>
        </div>
      </nav>

      {/* Part 2 Navigation  */}

      <div className='w-full flex'>
        <div>
          <div className='flex justify-between w-full'>
            <img src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path
              || info.detail.backdrop_path}`}
              className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] 
          h-[30vh] object-cover'
            />
            <div className='w-full'>
              {info.detail.vote_average && <div
                className='font-semibold bg-yellow-600 w-[5vh] h-[5vh] flex justify-center items-center rounded-full'>
                {(info.detail.vote_average * 10).toFixed()}%
              </div>}
            </div>
          </div>
          <div className='content mt-[1%] w-full'>
            <h1 className=' text-3xl font-bold'>
              {info.detail.name
                || info.detail.title
                || info.detail.original_name
                || info.detail.original_title}
            </h1>
            <div className='mt-[1%]'>
              <h1 className='text-xl mb-2'>User score </h1>
              <h1>{info.detail.release_date}</h1>
              <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            </div>
            <small>({info.detail.release_date.split()[0]})</small>
            <h1 className='mt-[1%]'>{info.detail.runtime}min</h1>
            <h1 className='mt-[1%] w-1/2'> Overview - {info.detail.overview.slice(0, 500)}</h1>
            <h1 className='mt-7'><Link className='p-3 bg-[#6556CD] rounded' to={`${pathname}/trailer`}>Play Trailer <i className="ri-play-fill"></i></Link></h1>
          </div>

          {/* Available Platforms */}
          <div className='flex flex-col items-center justify-center ml-[1%]'>
            {info.watchproviders && info.watchproviders.flatrate && (
              <div className='flex w-full mt-[2%]'>
                <h1 className='p-3 text-xl ml-[-1.5%]'> Available Platforms</h1>
                {info.watchproviders.flatrate.map((e,i) => (
                  <img className='w-[7vh] h-[7vh] object-cover ml-[1%] rounded-md' key={i}
                    src={`https://image.tmdb.org/t/p/original/${e.logo_path}`}
                  />
                ))}
              </div>
            )}
            {info.watchproviders && info.watchproviders.rent && (
              <div className='flex w-full mb-4 mt-[2%]'>
                <h1 className='p-3 ml-[-1.5%] text-xl'>Available on rent</h1>
                {info.watchproviders.rent.map((e,i) => (
                  <img className='w-[7vh] h-[7vh] object-cover ml-[2.5%] rounded-md' key={i}
                    src={`https://image.tmdb.org/t/p/original/${e.logo_path}`}
                  />
                ))}
              </div>
            )}
            {info.watchproviders && info.watchproviders.buy && (
              <div className='flex w-full mt-[2%]'>
                <h1 className='p-3 ml-[-1.5%] text-xl'>Available to buy</h1>
                {info.watchproviders.buy.map((e,i) => (
                  <img className='w-[7vh] h-[7vh] object-cover  ml-[2.5%] rounded-md' key={i}
                    src={`https://image.tmdb.org/t/p/original/${e.logo_path}`}
                  />
                ))}
              </div>
            )}
          </div>
          {/* Recommendations */}

          <div className='overflow-y-hidden w-[50%] mt-10'>
          <hr className='mb-[2%] bg-zinc-500 border-none h-[1px]'/>
          <h1 className='text-2xl font-semibold text-white'>Recommendations & Similar stuff</h1>
            <HorizontalCards data={info.recommendations.length > 0 ?
              info.recommendations : info.similar} />
              <Outlet />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default moviedetails;