import React, { useEffect, useState } from 'react'
import { GifState } from '../context/gif-context'
import Gif from '../components/Gif'

const Favourites = () => {
  const {gf , favourites} = GifState();
  const [favouriteGifs , setFavouriteGifs] = useState();

  const fetchFavourites = async ()=>{
    const {data} = await gf.gifs(favourites);
    setFavouriteGifs(data);
  }

  useEffect(()=>{
    fetchFavourites();
  }, [])


  return (
    <div>
      <h1 className=' my-2 font-bold text-3xl'>My Favourites</h1>
      <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2'>
        {favouriteGifs?.map((gif,i)=>{
          return <Gif key={i} gif={gif} />
        })}
      </div>
    </div>
  )
}

export default Favourites
