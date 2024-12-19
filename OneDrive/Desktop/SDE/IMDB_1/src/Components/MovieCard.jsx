function MovieCard(props){

    const {movie} = props;

    const isMoviePresentInWatchList = (movie)=>{
        const res = props.watchlistMovies.some((currmovie)=> currmovie.id===movie.id);
        return res;
    }

    return(
        <>
            <div className="h-[60vh] w-[200px] bg-black rounded-2xl">
                <div className="h-[40vh] w-[200px] bg-cover bg-center rounded-2xl flex justify-end" 
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original${props.movie.poster_path})`
                            }}>
                {isMoviePresentInWatchList(movie)? <i onClick={()=>props.removeFromWatchlist(movie)} className="fas fa-heart text-red-500 text-2xl mr-1"></i> 
                                             : <i onClick={()=>props.addToWatchlist(movie)} className="fas fa-heart   text-white  text-2xl mr-1"></i> 
                }

                </div>

                <div>
                    <h1 className="title text-white">{props.movie.title}</h1>
                    <h1 className="title text-yellow-200">{props.movie.vote_average}</h1>
                </div>
            </div>
                        
        </>
    )
}

export default MovieCard;