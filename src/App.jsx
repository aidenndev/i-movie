import { use, useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

function App() {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_BASE_URL = `https://api.themoviedb.org/3/`;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query = "") => {
    setLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log("Fetched movies:", data);

      if (data.Response === "False") {
        setErrorMessage(data.Error || "No movies found");
        setMovies([]);
        return;
      }

      setMovies(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch movies based on searchTerm
    fetchMovies(searchTerm);
  }, [searchTerm]);
  return (
    <main>
        {/*Header*/}
        <div className="wrapper">
          <header>
            <img
              src="./src/assets/avengers.png"
              alt="Avengers Banner"
              className="w-70 h-70"
            />
            <h1 className="text-4xl font-bold text-white-900 justify-center">
              Welcome to iMovie
            </h1>
            <h3 className="text-2xl text-white-700">
              Find <span className="text-gradient">Movies</span> You Will Enjoy!
            </h3>
          </header>
        </div>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h2 className="text-2xl font-bold text-white-900">All movies</h2>
        <section className="movie-list">
          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="error-message">{errorMessage}</p>
          ) : (
              movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
          )}
        </section>
    </main>
  );
}

export default App;
