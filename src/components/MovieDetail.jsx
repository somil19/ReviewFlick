import { useEffect, useState } from "react";
import StarRatings from "../StarRatings.js";
import Loader from "./Loader";
const key = "bed5f760";
export default function MovieDetail({
  isSelected,
  onCloseSelectedMovie,
  handleWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched
    .map((watched) => watched.imdbID)
    .includes(isSelected);

  const watchedUserRating = watched.find(
    (watched) => watched.imdbID === isSelected
  )?.userRating;

  console.log(isWatched);
  function onWatchedMovie() {
    const newWtachedMovie = {
      imdbID: isSelected,
      Title: movie.Title,
      Year: movie.Released,
      Poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: movie.Runtime.split(" ").at(0),
      userRating: userRating,
    };
    console.log(newWtachedMovie);
    handleWatchedMovie(newWtachedMovie);
    onCloseSelectedMovie();
  }

  useEffect(() => {
    document.addEventListener("keydown", function (e) {
      if (e.code === "Escape") {
        onCloseSelectedMovie();
      }
    });
  }, [onCloseSelectedMovie]);

  useEffect(() => {
    async function getMovies() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${isSelected}`
      );
      const data = await res.json();
      setIsLoading(false);
      setMovie(data);
      console.log(data);
    }
    getMovies();
  }, [isSelected]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `Movie | ${movie.Title}`;

    //useEffect return a cleanUp function we wil need this whenever the side effect keeps happening after the component has been  re-render.
    return function () {
      document.title = "🎥ReviewFlicks.com";
    };
  }, [movie.Title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseSelectedMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt="" />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          <section>
            {isWatched ? (
              <div className="btn-add" style={{ textAlign: "center" }}>
                ✔ In WatchList with {watchedUserRating}⭐️
              </div>
            ) : (
              <div className="rating">
                <StarRatings maxRating={10} onSetUserRating={setUserRating} />{" "}
                {userRating && (
                  <button className="btn-add" onClick={onWatchedMovie}>
                    {" "}
                    + Add To Your List{" "}
                  </button>
                )}
              </div>
            )}
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>{movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>{" "}
        </>
      )}
    </div>
  );
}
