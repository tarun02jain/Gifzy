import React from "react";
import { GifState } from "../context/gif-context";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];
const FilterGif = ({ alignLeft = false, showTrending = false }) => {
  const { filter, setFilter } = GifState();

  return (
    <div
      className={`flex my-2 gap-3 ${alignLeft ? "" : "justify-end"} ${
        showTrending
          ? "justify-between flex-col sm:flex-row sm:items-center "
          : ""
      }`}
    >
      {showTrending && (
        <span className="flex gap-2">
          <HiMiniArrowTrendingUp size={25} className="text-teal-400" />
          <span className="font-semibold text-gray-400 ">Trending</span>
        </span>
      )}
      <div className="flex min-w-72 bg-gray-800 rounded-full">
        {filters.map((fil, i) => {
          return (
            <span
              onClick={()=>{setFilter(fil.value);}}
              className={` ${filter == fil.value ? fil.background: ""} font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer `}
              key={i}
            >
              {fil.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default FilterGif;
