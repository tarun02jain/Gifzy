import React, { useEffect } from 'react'
import { GifState } from '../context/gif-context';
import Gif from '../components/Gif'
import FilterGif from '../components/FilterGif';

const Home = () => {
  const {gf, gifs , setGifs, filter} =  GifState();

  const fetchTrendings = async ()=>{
    const {data} = await gf.trending({
      limit: 50,
      type: filter,
      rating: 'g'
    });

    setGifs(data);
  }

  useEffect(()=>{
    fetchTrendings();
  },[filter])

  return (
    <div>
      <img 
        src='/banner.gif'
        alt='earth banner'
        className='w-full mt-2 rounded'
      />

      <FilterGif showTrending /> 

      <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
        {gifs.map((gif,i)=>{
          return <Gif key={i} gif = {gif} />
        })}
      </div>
    </div>
  )
}

export default Home
