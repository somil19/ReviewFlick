// import { useEffect, useRef, useState } from "react";
// import StarRatings from "./StarRatings";
// // import CurrencySpliter from "./CurrencySpliter";

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
// const key = "bed5f760";

// export default function App() {
//   const [movies, setMovies] = useState([]);
//   const [isloading, setIsloading] = useState(false);
//   const [query, setQuery] = useState("");
//   const [error, setError] = useState("");
//   const [isSelected, setIselected] = useState(null);
//   const [watched, setWatched] = useState(function () {
//     const storedValue = localStorage.getItem("watched");
//     return JSON.parse(storedValue);
//   });

//   // useEffect(function () {
//   //   console.log("initial render");
//   // }, []);

//   // useEffect(function () {
//   //   console.log(" render everytime");
//   // });
//   // console.log("During render");
//   function handleSelected(id) {
//     setIselected((isSelected) => (id === isSelected ? null : id));
//   }
//   function onCloseMovie() {
//     setIselected(null);
//   }
//   function handleWatchedMovies(newMovie) {
//     setWatched((watched) => [...watched, newMovie]);
//   }
//   function deleteWatchdMovie(id) {
//     setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
//   }
//   useEffect(function () {
//     document.addEventListener("keydown", function (e) {
//       if (e.code === "Escape") {
//         onCloseMovie();
//       }
//     });
//   }, []);

//   //to store in Local storage
//   useEffect(
//     function () {
//       localStorage.setItem("watched", JSON.stringify(watched));
//     },
//     [watched]
//   );

//   useEffect(() => {
//     const controller = new AbortController();
//     async function fetchMovies() {
//       try {
//         setIsloading(true);
//         setError(""); // Clear any previous errors
//         const res = await fetch(
//           `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
//           { signal: controller.signal }
//         );

//         if (!res.ok) {
//           throw new Error("Something Went Wrong...Try again later");
//         }

//         const data = await res.json();
//         console.log(data);
//         if (data.Response === "False") {
//           throw new Error(data.Error);
//         }

//         setMovies(data.Search);
//         console.log(data.Search);
//       } catch (err) {
//         console.error(err.message || "An error occurred"); // Log the error message or a generic message
//         setError(err.message || `No results found for "${query}" `); // Set the error message or a generic message
//       } finally {
//         setIsloading(false);
//       }
//     }

//     if (query.length < 3) {
//       setMovies([]);
//       setError(!query.length ? " " : `No results found for "${query}" `); // Clear any previous errors when query is too short
//       return;
//     } else {
//       // Only call fetchMovies when query is long enough
//       fetchMovies();
//       return function () {
//         controller.abort();
//       };
//     }
//   }, [query]);

//   return (
//     <>
//       {" "}
//       {/* <CurrencySpliter /> */}
//       <Nabavar>
//         {" "}
//         <Search query={query} setQuery={setQuery} />
//         <NumResults movies={movies} />
//       </Nabavar>
//       <Main>
//         <Box>
//           {isloading && <Loader />}
//           {!isloading && !error && (
//             <MovieList movies={movies} handleSelected={handleSelected} />
//           )}
//           {error && <Error message={error} />}
//         </Box>

//         <Box>
//           {isSelected ? (
//             <MovieDetails
//               isSelected={isSelected}
//               onCloseMovie={onCloseMovie}
//               onHndlWtcdMovie={handleWatchedMovies}
//               watched={watched}
//             />
//           ) : (
//             <>
//               {" "}
//               <WatchSummary watched={watched} />
//               <WatchList
//                 watched={watched}
//                 onDeleteWatchdMovie={deleteWatchdMovie}
//               />{" "}
//             </>
//           )}
//         </Box>
//       </Main>
//     </>
//   );
// }
// function Loader() {
//   return <p className="loader">Loading...</p>;
// }
// function Error({ message }) {
//   return <p className="error">{message}</p>;
// }

// function Nabavar({ children }) {
//   return (
//     <nav className="nav-bar">
//       <Logo />

//       {children}
//     </nav>
//   );
// }
// function Logo() {
//   return (
//     <div className="logo">
//       <span role="img">🍿</span>
//       <h1>usePopcorn</h1>
//     </div>
//   );
// }

// function Search({ query, setQuery }) {
//   const inputElement = useRef(null);

//   useEffect(function () {
//     function callback(e) {
//       if (e.code === "Enter") {
//         inputElement.current.focus();
//       }
//     }

//     document.addEventListener("keydown", callback);
//     return () => document.addEventListener("keydown", callback);
//   }, []);

//   return (
//     <input
//       className="search"
//       type="text"
//       placeholder="Search movies..."
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//       ref={inputElement}
//     />
//   );
// }

// function NumResults({ movies }) {
//   return (
//     <p className="num-results">
//       Found <strong>{movies.length}</strong> results
//     </p>
//   );
// }

// function Main({ children }) {
//   return <main className="main">{children}</main>;
// }

// function Box({ children }) {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen && children}
//     </div>
//   );
// }

// function MovieList({ movies, handleSelected }) {
//   return (
//     <ul className="list list-movies">
//       {movies?.map((movie) => (
//         <li key={movie.imdbID} onClick={() => handleSelected(movie.imdbID)}>
//           <img src={movie.Poster} alt={`${movie.Title} poster`} />
//           <h3>{movie.Title}</h3>
//           <div>
//             <p>
//               <span>🗓</span>
//               <span>{movie.Year}</span>
//             </p>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }
// function MovieDetails({ isSelected, onCloseMovie, onHndlWtcdMovie, watched }) {
//   const [movie, setMovie] = useState({});
//   const [isloading, setIsloading] = useState(false);
//   const [userRating, setUserRating] = useState("");

//   const isWatched = watched.map((movie) => movie.imdbID).includes(isSelected);
//   const watchedUserRating = watched.find(
//     (movie) => movie.imdbID === isSelected
//   )?.userRating;
//   function handleAdd() {
//     const newWatchedMovie = {
//       imdbID: isSelected,
//       title,
//       year,
//       poster,
//       imdbRating: Number(imdbRating),
//       runtime: Number(runtime.split(" ").at(0)),
//       userRating,
//       // countRatingDecisions: countRef.current,
//     };

//     onHndlWtcdMovie(newWatchedMovie);
//     onCloseMovie();
//     setUserRating("");
//   }

//   //We are just Destructuring the objects property name (changing name according to us)
//   //Destructuring allows you to extract specific properties from an object and assign them to variables with the same names as the object's properties.
//   const {
//     Title: title,
//     Year: year,
//     Poster: poster,
//     Runtime: runtime,
//     imdbRating,
//     Plot: plot,
//     Released: released,
//     Actors: actors,
//     Director: director,
//     Genre: genre,
//   } = movie;

//   useEffect(
//     function () {
//       async function getMovieDetails() {
//         setIsloading(true);
//         const res = await fetch(
//           `http://www.omdbapi.com/?apikey=${key}&i=${isSelected}`
//         );
//         const data = await res.json();
//         console.log(data);
//         setMovie(data);
//         setIsloading(false);
//       }

//       getMovieDetails();
//     },
//     [isSelected]
//   );

//   useEffect(
//     function () {
//       if (!title) return;
//       document.title = `Movie | ${title}`;
//       return function () {
//         document.title = "usePopcorn";
//       };
//     },
//     [title]
//   );
//   return (
//     <div className="details">
//       {isloading ? (
//         <Loader />
//       ) : (
//         <>
//           <header>
//             <button className="btn-back" onClick={onCloseMovie}>
//               &larr;
//             </button>
//             <img src={poster} alt={`Poster of ${movie} movie`} />
//             <div className="details-overview">
//               <h2>{title}</h2>
//               <p>
//                 {released} &bull; {runtime}
//               </p>
//               <p>{genre}</p>
//               <p>
//                 <span>⭐️</span>
//                 {imdbRating} IMDb rating
//               </p>
//             </div>
//           </header>

//           <section>
//             <div className="rating">
//               {!isWatched ? (
//                 <>
//                   {" "}
//                   <StarRatings maxRating={10} onSetRating={setUserRating} />
//                   {userRating > 0 && (
//                     <button className="btn-add" onClick={handleAdd}>
//                       + Add to list
//                     </button>
//                   )}
//                 </>
//               ) : (
//                 <p>
//                   You rated with movie {watchedUserRating} <span>⭐️</span>
//                 </p>
//               )}
//             </div>
//             <p>
//               <em>{plot}</em>
//             </p>
//             <p>Starring {actors}</p>
//             <p>Directed by {director}</p>
//           </section>
//         </>
//       )}
//     </div>
//   );
// }

// function WatchList({ watched, onDeleteWatchdMovie }) {
//   return (
//     <ul className="list">
//       {watched.map((movie) => (
//         <li key={movie.imdbID}>
//           <img src={movie.poster} alt={`${movie.title} poster`} />
//           <h3>{movie.title}</h3>
//           <div>
//             <p>
//               <span>⭐️</span>
//               <span>{movie.imdbRating}</span>
//             </p>
//             <p>
//               <span>🌟</span>
//               <span>{movie.userRating}</span>
//             </p>
//             <p>
//               <span>⏳</span>
//               <span>{movie.runtime} min</span>
//             </p>
//             <button
//               className="btn-delete"
//               onClick={() => onDeleteWatchdMovie(movie.imdbID)}
//             >
//               X
//             </button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }
// function WatchSummary({ watched }) {
//   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//   const avgUserRating = average(watched.map((movie) => movie.userRating));
//   const avgRuntime = average(watched.map((movie) => movie.runtime));
//   return (
//     <div className="summary">
//       <h2>Movies you watched</h2>
//       <div>
//         <p>
//           <span>#️⃣</span>
//           <span>{watched.length} movies</span>
//         </p>
//         <p>
//           <span>⭐️</span>
//           <span>{avgImdbRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{avgUserRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{avgRuntime.toFixed(2)} min</span>
//         </p>
//       </div>
//     </div>
//   );
// }

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useState } from "react";
import { useEffect } from "react";
import ListBox from "./components/ListBox";
import Loader from "./components/Loader";
import MoviesList from "./components/MoviesList";
import Error from "./components/Error";
import MovieDetail from "./components/MovieDetail";
import WatchedMoviesList from "./components/WatchedMoviesList";

// eslint-disable-next-line no-lone-blocks
{
  /* <h1>Radhe Radhe!</h1> */
}

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const key = "bed5f760";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isSelected, setIsSelected] = useState(null);

  function handleIsSelected(id) {
    setIsSelected((isSelected) => (isSelected === id ? null : id));
  }
  function closeSelectedMovie() {
    setIsSelected(null);
  }

  function removeWatchedMovie(id) {
    setWatchedMovies((watchedMovies) =>
      watchedMovies.filter((watched) => id !== watched.imdbID)
    );
  }
  function handleWatchedMovies(newMovie) {
    setWatchedMovies((watchedMovies) => [...watchedMovies, newMovie]);
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setErrorMessage(""); //before fetching we just reseting the error = " "
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Something Went Wrong");

        const data = await res.json();
        console.log(data);

        if (data.Response === "False") {
          throw new Error("Movie Not Found");
        }
        setMovies(data.Search);
        setErrorMessage("");
      } catch (error) {
        if (error.name !== "AbortError")
          setErrorMessage(error.message || `${query} Movie Not Found`);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setErrorMessage("");
      return;
    }
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar query={query} setQuery={setQuery} movies={movies} />

      <Main>
        <>
          <ListBox
            element={
              <>
                {isLoading && <Loader />}
                {!errorMessage && !isLoading && (
                  <MoviesList movies={movies} onIsSelected={handleIsSelected} />
                )}
                {errorMessage && <Error errorMessage={errorMessage} />}
              </>
            }
          />
          <ListBox
            element={
              <>
                {isSelected ? (
                  <MovieDetail
                    isSelected={isSelected}
                    onCloseSelectedMovie={closeSelectedMovie}
                    handleWatchedMovie={handleWatchedMovies}
                    watched={watchedMovies}
                  />
                ) : (
                  <WatchedMoviesList
                    watched={watchedMovies}
                    onRemoveWatchedMovie={removeWatchedMovie}
                  />
                )}
              </>
            }
          />
        </>
      </Main>
    </>
  );
}
