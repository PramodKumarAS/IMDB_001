import Banner from "./Banner";
import Movies from "./Movies";


function Home({watchlistMovies,setwatchlistMovies}){

    return(
        <>
            <Banner/>
            <Movies watchlistMovies={watchlistMovies} setwatchlistMovies={setwatchlistMovies}/>
        </>
    )
}

export default Home;