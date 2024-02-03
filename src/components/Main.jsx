export default function Main({ children }) {
  return (
    <main className="main">
      {/* <ListBox>
        <MoviesList movies={movies} />
      </ListBox>

      <ListBox>
        <WatchedMoviesList watched={watched} />
      </ListBox> */}
      {/* Another way to do it by using like this a props which is element */}
      {children}
    </main>
  );
}
