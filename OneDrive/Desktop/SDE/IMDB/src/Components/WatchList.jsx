import { useEffect,useState } from "react";
import { GENRE_IDS_MAP } from "../../Constants";

function WatchList({watchlistMovies,setwatchlistMovies}){

    const getGenreFromId = id => {
        return GENRE_IDS_MAP[id];
    }

    const [isTitleSorted,setTitleSorted] = useState(true)
    const [isvote_averageSorted,setvote_averageSorted] = useState(true)
    const [isRelaseDateSorted,setRelaseDateSorted] = useState(true)
    const [searchedMovie,setSearch] = useState('')
    const [movieGenre,setmovieGenre] = useState('All Genres')
    const [listofgenres,setlistofgenres] = useState(['All Genres'])
    const [activefilter,setactivefilter] = useState('All Genres')

    useEffect(() => {
        const moviesFromLS = localStorage.getItem('watchlisted');
        setwatchlistMovies(JSON.parse(moviesFromLS))
    }, [])

    useEffect(() => {

        const moviesFrom = watchlistMovies.map((movie)=>getGenreFromId(movie.genre_ids[0]))
        const movieGernres = new Set(moviesFrom)
        setlistofgenres(['All Genres', ...movieGernres])
    }, [watchlistMovies])


    function handleAscendingSort_title(){
        const updatedArr =watchlistMovies.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        setwatchlistMovies([...updatedArr])
        setTitleSorted(false);
    }

    function handleDescendingSort_title(){
        const updatedArr =watchlistMovies.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
        setwatchlistMovies([...updatedArr])
        setTitleSorted(true);
    }

    function handleAscendingSort_vote_average(){
        const updatedArr =watchlistMovies.sort((a, b) => a.vote_average-b.vote_average);
        setwatchlistMovies([...updatedArr])
        setvote_averageSorted(false)
    }

    function handleDescendingSort_vote_average(){
        const updatedArr =watchlistMovies.sort((a, b) => b.vote_average-a.vote_average);
        setwatchlistMovies([...updatedArr])
        setvote_averageSorted(true)
    }

    function handleAscendingSort_release_date(){
        const updatedArr =watchlistMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        setwatchlistMovies([...updatedArr])
        setRelaseDateSorted(false)
    }

    function handleDescendingSort_release_date(){
        const updatedArr =watchlistMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        setwatchlistMovies([...updatedArr])
        setRelaseDateSorted(true)
    }

    function handleSearch(e){
        setSearch(e.target.value)
    }

    function handleFilter(e){
        setmovieGenre(e)
        setactivefilter(e)
    }

    return(
        <>
        <div className="flex items-center justify-center h-20 w-300">
          <label  htmlFor=""><input placeholder="Search Movie" onChange={handleSearch} value={searchedMovie} className="w-full px-4 py-2 border rounded-lg text-sm 
          border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" /></label>
        </div>
  
        <div className="ml-6">
            <div className="flex items-center justify-start w-[1000vw]">
                    <div className="flex items-center  w-[100vw] mb-4">
                        {listofgenres
                        .map((moviegenre)=>{
                            return(

                                <button onClick={()=>handleFilter(moviegenre)}  className= {`px-4 py-2 text-sm font-medium border   
                                    ${            activefilter === moviegenre
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}>{moviegenre}</button>
                            )
                        })}
                    </div>            
            </div>
        </div>

         <div>
            <table className="w-full border-collapse text-left mt-4">

                <thead>
                    <tr>
                        <th></th>

                        <th> 
                            <div className="flex"> 
                               {isTitleSorted?
                                <i onClick={handleAscendingSort_title} className="fa-solid fa-arrow-up opacity-20 hover:cursor-pointer hover:opacity-100 mx-1"/>
                               :<i onClick= {handleDescendingSort_title} className="fa-solid fa-arrow-down opacity-20 hover:cursor-pointer   hover:opacity-100 mx-1"/> } 
                                       Title                               
                            </div>
                        </th>
                        <th> 
                            <div className="flex"> 
                               {isvote_averageSorted?
                                <i onClick={handleAscendingSort_vote_average} className="fa-solid fa-arrow-up opacity-20 hover:cursor-pointer hover:opacity-100 mx-1"/>
                               :<i onClick= {handleDescendingSort_vote_average} className="fa-solid fa-arrow-down opacity-20 hover:cursor-pointer   hover:opacity-100 mx-1"/> } 
                                       Ratings                               
                            </div>
                        </th>

                        <th> <div className="flex"> Genre </div></th>

                        <th> 
                            <div className="flex"> 
                               {isRelaseDateSorted?
                                <i onClick={handleAscendingSort_release_date} className="fa-solid fa-arrow-up opacity-20 hover:cursor-pointer hover:opacity-100 mx-1"/>
                               :<i onClick= {handleDescendingSort_release_date} className="fa-solid fa-arrow-down opacity-20 hover:cursor-pointer   hover:opacity-100 mx-1"/> } 
                                       Relase Date                               
                            </div>
                        </th>
                   </tr>                    
                </thead>

                <tbody  className="divide-y divide-x-gray-100 border-r border-t border-l">

                    {watchlistMovies
                    .filter((movie)=>{
                        if(movieGenre==='All Genres'){
                            return true;
                        }

                        else{
                            return movieGenre===GENRE_IDS_MAP[movie.genre_ids[0]]
                        }
                    })
                    .filter((movie)=>movie.title.toLowerCase().startsWith(searchedMovie.toLowerCase()))
                    .map((movie,index)=>{
                        return(
                            <>
                                                
                                <tr key={movie.id}>
                                    <td className="flex items-center px-6 py-4 gap-4"><img className="h-[6rem] w-[8rem] object-fit object-cover" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt=""/></td>
                                    <td  className="text-[20px]">{movie.title}</td>
                                    <td className="text-[20px]">{movie.vote_average}</td>
                                    <td  className="text-[20px]">{getGenreFromId(movie.genre_ids[0])}</td>
                                    <td  className="text-[20px]">{movie.release_date}</td>
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
            
         </div>
        </>
    )
}

export default WatchList;