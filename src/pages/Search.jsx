import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../context/gif-context';
import FilterGif from '../components/FilterGif';
import Gif from '../components/Gif';

const Search = () => {
  const [searchResp, setsearchResp] = useState([]);

  const {query} = useParams();
  const {gf , filter} = GifState();

  const fetchSearch = async ()=>{
    const {data} = await gf.search(query , {
      sort:"relevant",
      language:"en",
      limit:20,
      type: filter

    });
    setsearchResp(data);
  }

  useEffect(()=>{
    fetchSearch();
  },[query , filter])

  return (
    <div className='my-4'>
      <h2 className='text-5xl pb-3 pl-2 font-extrabold capitalize'>{query}</h2>

      <FilterGif alignLeft/>
      {searchResp.length  > 0 ? (
        <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
        {searchResp.map((res,i)=>{
          return <Gif key={i} gif = {res} />
        })}
      </div>
      ):(
        <span> No GIFs found for this {query}. Try searching for Stickers instead?</span>
      )}
    </div>
  )
}

export default Search