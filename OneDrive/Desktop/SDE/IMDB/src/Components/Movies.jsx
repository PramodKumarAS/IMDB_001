import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from 'axios';
import Pagination from './Pagination';

function Movies({watchlistMovies,setwatchlistMovies}){
    const[movies,setMovies] = useState([]);
    const[moviesNotLoaded,setmoviesNotLoaded] = useState("");
    const[pageNumber,setpageNumber] = useState(1);
    
    useEffect(()=>{

        axios.get('https://api.themoviedb.org/3/trending/movie/day',{
                params:{
                    api_key:'51fc1a83636c535ec99bf2ef905e26ee',
                    langauge:'en-US',
                    page:pageNumber  
                }

                }).then((moviesData) => {
                    setMovies(moviesData.data.results);
                })
                .catch((error) => {
                    setmoviesNotLoaded(error.message);
                });
    },[pageNumber])

    useEffect(()=>{
        const watchListedfromlocalJSON = localStorage.getItem("watchlisted");
        
        if(watchListedfromlocalJSON){
            setwatchlistMovies(JSON.parse(watchListedfromlocalJSON))
        }
    },[])

    function handleNext(){
        setpageNumber(pageNumber+1);
    }

    function handlePrevious(){
        setpageNumber(Math.max(1,pageNumber-1));
    }

    function addToWatchlist(wacthListmovie){
        const updatedList = [...watchlistMovies,wacthListmovie]
        setwatchlistMovies(updatedList);
        
        localStorage.setItem("watchlisted",JSON.stringify(updatedList));

    }
    function removeFromWatchlist(wacthListmovie){
        
        const filteredMovies = watchlistMovies.filter((movie)=>wacthListmovie.id!==movie.id);
        setwatchlistMovies(filteredMovies);

        localStorage.setItem("watchlisted",JSON.stringify(filteredMovies));

    }

    return(
        <>
            <div className="flex justify-evenly flex-wrap gap-8">
                           
                {movies?.length>0 ? movies.map((movieObj,index)=>

                    <MovieCard movie={movieObj} addToWatchlist={addToWatchlist}  removeFromWatchlist={removeFromWatchlist} watchlistMovies={watchlistMovies}/>
               
               )
               :
                <div className="flex justify-center items-center space-x-2">
                    <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin"></div>
                    <p>Loading...</p>
                </div>
             }
            </div>
            
            <Pagination pageNumber = {pageNumber} handlePrevious={handlePrevious} handleNext={handleNext} />
        </>
    )
}

export default Movies;