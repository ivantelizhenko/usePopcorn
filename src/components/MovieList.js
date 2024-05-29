export default function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map(movie => (
        <MovieListItem
          key={movie.imdbID}
          imdbID={movie.imdbID}
          poster={movie.Poster}
          title={movie.Title}
          year={movie.Year}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

function MovieListItem({ imdbID, poster, title, year, onSelectMovie }) {
  return (
    <li key={imdbID} onClick={e => onSelectMovie(imdbID)}>
      <img src={poster} alt={`${title} poster`} />
      <h3>{title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{year}</span>
        </p>
      </div>
    </li>
  );
}
