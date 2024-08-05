import React, { useState } from 'react'
import { HiMiniXMark, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const GifSearch = () => {
  const [query, setquery] = useState("");
  const navigate = useNavigate();

  const searchGif =  ()=>{
    if(query.trim() === "") return;
     navigate(`/search/${query}`)
  }

  const handleKeyDown = (e)=>{
    if(e.key === "Enter") searchGif();
  }

  return (
    <div className='flex relative'>
      <input 
        type="text"
        value={query}
        placeholder='Search all the Gifs and Stickers'
        onChange={(e)=>setquery(e.target.value)}
        onKeyDown={handleKeyDown}
        className='w-full pl-4 pr-14 py-5 text-black text-xl rounded-tl rounded-bl border border-gray-300 outline-none'
      
      />
      {query&&(
        <button 
          onClick={()=>setquery("")}
          className='absolute right-20 top-6 bg-gray-300 opacity-90 rounded-full'
        >
          <HiMiniXMark size={22} />
        </button>
      )}
      <button 
        onClick={searchGif}
        className='bg-gradient-to-tr from-pink-600 to-pink-500 rounded-br rounded-tr px-2 py-4'
      >
        <HiOutlineMagnifyingGlass size={35} />
      </button>
    </div>
  )
}

export default GifSearch