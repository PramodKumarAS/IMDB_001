import NavBar from "./Components/NavBar";
import { useState } from 'react';
function App() {

   const [watchlistMovies,setwatchlistMovies] = useState([]);

   return(
    <>

        <NavBar watchlistMovies={watchlistMovies} setwatchlistMovies={setwatchlistMovies}/>

    </>
   )
}

export default App;
