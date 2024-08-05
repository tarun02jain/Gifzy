import React, { useEffect, useState } from "react";
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { GifState } from "../context/gif-context";
import GifSearch from "./GifSearch";

const Header = () => {
  const [categories, setcategories] = useState([]);
  const [showCategories, setshowCategories] = useState(false);

  const {gf, favourites} = GifState();

  const fetchCategories = async () =>{
    const {data} = await gf.categories()
    setcategories(data);
  };

  useEffect(()=>{
    fetchCategories();
  },[])

  return (
    <nav>
      <div className="relative flex justify-between items-center gap-4 mb-2">
        <Link to="/" className="flex gap-2">
          <img src="/logo.svg" className="w-8" alt="Giphzy Logo" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIFZY
          </h1>
        </Link>
        <div className="flex gap-2 text-md font-bold items-center">
          {categories?.slice(0,5)?.map((category) =>{
            return <Link key = {category.name} to = {`/${category.name_encoded}`} className="px-4 py-1 hover:gradient border-b-4 hidden lg:block">
            {category.name}
          </Link>
          })}
          

          <button  onMouseEnter={() => setshowCategories(!showCategories)} >
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient ${
                showCategories ? "gradient" : ""
              } border-b-4 hidden lg:block`}
            />
          </button>

          {
            favourites.length>0 && (<div className=" h-9 bg-gray-900 px-6 pt-1.5 cursor-pointer rounded ">
              <Link to="/favourites">Favourite GIFs</Link>
            </div>)
          }

          <button>
            <HiMiniBars3BottomRight
              size={30}
              className="text-sky-400 block lg:hidden"
            ></HiMiniBars3BottomRight>
          </button>
        </div>

        {showCategories && (
          <div onMouseLeave={()=> setshowCategories(false)} className="absolute w-full right-0 top-14 px-10 pt-6 pb-9 gradient z-30 rounded">
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categories.map((category)=>{
                return <Link className="font-bold" key = {category.name} to = {`/${category.name_encoded}`} >
                  {category.name}
                </Link>
              })}
            </div>
          </div>
        )}
      </div>

        <GifSearch/>
      
    </nav>
  );
};

export default Header;
