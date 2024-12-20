import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Banner(){
    const [bannerImg, setBannerImg] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=51fc1a83636c535ec99bf2ef905e26ee`)
            .then((response) => {
                const firstMovieMeta = response.data.results[0];
                const fmTitle = firstMovieMeta.title;
                const fmImg = firstMovieMeta.backdrop_path;
                setTitle(fmTitle);
                setBannerImg(`https://image.tmdb.org/t/p/original${fmImg}`)
            })
            .catch(e => console.log(e))
    }, [])

    return(
        <>
            <div className="h-[20vh] md:h-[75vh] object-fit object-cover bg-cover bg-center flex items-end mb-8"
                style={{
                    backgroundImage: `url(${bannerImg})`
                }}
            >

            <div className="text-white text-2xl text-center w-full">{title}</div>
          </div>
        </>
    )
}

export default Banner