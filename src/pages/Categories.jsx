import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../context/gif-context';
import Gif from '../components/Gif';
import Social from '../components/Social';

const Categories = () => {
  const [catRes , setCatRes] = useState([]);
  const {category} = useParams();

  const {gf} = GifState();

  const fetchCategory = async ()=>{
    const {data} = await gf.gifs(category , category);
    setCatRes(data);
  }

  useEffect(()=>{
    fetchCategory();
  },[category])

  return (
    <div className='flex flex-col sm:flex-row gap-5 my-4'>
      <div className='w-full sm:w-72'>
        {catRes.length > 0 && <Gif gif={catRes[0]} hover={false} />}
        <span className='text-gray-400 text-sm pt-2'>
          Don't Tell it to me, GIF it to me!
        </span>

        <Social />
      <div className='divider'></div>
      </div>
      <div>
        <h2 className='text-4xl pb-1 capitalize font-extrabold'>
          {category.split('-').join(" & ")} GIFs
        </h2>
        <h2 className='text-lg pb-3 font-bold text-gray-400 hover:text-gray-50 cursor-pointer'>
          @{category}
        </h2>

        <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
        {catRes.slice(1).map((res,i)=>{
          return <Gif key={i} gif = {res} />
        })}
      </div>
      </div>
    </div>
  )
}

export default Categories
