import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GifState } from "../context/gif-context";
import Gif from "../components/Gif";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import Social from "../components/Social";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";

const Singlegif = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState([]);
  const [relatedGif, setRelatedGif] = useState([]);
  const { gf, favourites, addToFavourites } = GifState();
  const contentType = ["gif", "sticker", "text"];
  const [readMore, setReadMore] = useState(false);

  const fetchGif = async () => {
    const GifId = slug.split("-");
    const { data } = await gf.gif(GifId[GifId.length - 1]);
    const { data: related } = await gf.related(GifId[GifId.length - 1], {
      limit: 40,
    });
    setGif(data);
    setRelatedGif(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid content type");
    }
    fetchGif();
  }, [type,slug]);

  function constructUrl(gifObject) {
    const baseUrl = "https://i.giphy.com/media/";
    const encodedParams = "v1.Y2lkPTc5MGI3NjExY2t2YW9lMGg0c3ljY3l5aWJ1MWNqeWR5dWczMjV6c3N5em1tbHFsbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw";
    const id = gifObject.id;
    const gifFileName = "giphy.gif";
    return `${baseUrl}${encodedParams}/${id}/${gifFileName}`;
  }

  const constructEmbedCode = (gifObject) => {
    const embedUrl = `https://giphy.com/embed/${gifObject.id}`;
    const pageUrl = gifObject.url;
    return `<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="${embedUrl}" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="${pageUrl}">via GIPHY</a></p>`;
  };

  const copyEmbed = async () =>{
    const embed = constructEmbedCode(gif)
    await navigator.clipboard.writeText(embed).then(() => {
      alert('Embeded code copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };


  const copyToClipboard = async () => {
    const url = constructUrl(gif)
    await navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };



  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        <>
          <div className="flex gap-4">
            <img
              src={gif?.user?.avatar_url}
              alt={gif?.user?.display_name}
              className="h-14"
            />

            <div className="px-2">
              <div className="font-bold">{gif?.user?.display_name}</div>
              <div className="faded-text">@{gif?.user?.username}</div>
            </div>
          </div>

          <div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "...."}
                {gif?.user?.description.length > 100 && (
                  <div
                    className="flex items-center faded-text cursor-pointer"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? (
                      <>
                        Read Less <HiMiniChevronUp size={20}></HiMiniChevronUp>
                      </>
                    ) : (
                      <>
                        Read More{" "}
                        <HiMiniChevronDown size={20}></HiMiniChevronDown>
                      </>
                    )}
                  </div>
                )}
              </p>
            )}
          </div>
        </>
        <Social />
        <div className="divider"></div>
        {gif?.source && (
          <div>
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={30} />
              <a href={gif?.source} target="_blank" className="truncate">
                {gif?.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />

              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
              <button
                className="ml-auto "
                // onClick={shareGif}
              >
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>



          <div className=" hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavourites(gif.id)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favourites.includes(gif.id) ? "text-red-500" : ""
                }`}
              />
              Favourite
            </button>

            <button
              onClick={()=>copyToClipboard()}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>

            <button
              onClick={()=>copyEmbed()}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>



        </div>
        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGif.slice(1).map((rel, i) => {
              return <Link to={`/${rel.type}/${rel.slug}`} >
                <Gif key={i} gif={rel} />
              </Link>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singlegif;
