import { Link } from 'react-router-dom'

const Sidenav = () => {

  return (
    <div className='w-[20%] h-full border-r-2 border-zinc-400 p-10'>
      <h1 className='text-3xl text-[#fff] font-semibold'>
        <i className="ri-tv-fill text-[#6556CD] mr-3"></i>
        <span className=''>Trailer Trove</span>
      </h1>
      <nav className='flex flex-col text-zinc-400 text-xl gap-1'>
        <h1
          className='text-white font-semibold text-xl mt-10 mb-5'>
          New feeds
        </h1>
        <Link to={"/trending"} className='hover:text-[#fff] hover:bg-[#6556CD] duration:300 rounded-md p-3.5'><i className="mr-2 ri-fire-fill"></i>Trending</Link>
        <Link to={"/popular"} className='hover:text-[#fff] hover:bg-[#6556CD] duration:300 rounded-md p-3.5'><i className="mr-2 ri-bard-fill"></i>Popular</Link>
        <Link to={"/movie"} className='hover:text-[#fff] hover:bg-[#6556CD] duration:300 rounded-md p-3.5'><i className="mr-2 ri-movie-fill"></i>Movies</Link>
        <Link to={"/tv"} className='hover:text-[#fff] hover:bg-[#6556CD] duration:300 rounded-md p-3.5'><i className="mr-2 ri-tv-2-fill"></i>TV shows</Link>
        <Link to={"/person"} className='hover:text-[#fff] hover:bg-[#6556CD] duration:300 rounded-md p-3.5 pb-3 mb-10'><i className="mr-2 ri-team-fill"></i>People</Link>
      </nav>
      <hr className='border-none h-[1px] bg-zinc-100' />
      <nav className='flex flex-col text-zinc-400 text-xl gap-1'>
        <h1
          className='text-white font-semibold text-xl mt-10 mb-5'>
        Website Info
        </h1>
        <Link className='hover:text-[#fff] hover:bg-[#6556CD] duration:300 rounded-md p-3.5'><i className="mr-2 ri-information-fill"></i>About Us</Link>
        <Link className='hover:text-[#fff] hover:bg-[#6556CD] duration:300 rounded-md p-3.5'><i className="mr-2 ri-phone-fill"></i>Contact</Link>
      </nav>
    </div>
  )
}

export default Sidenav