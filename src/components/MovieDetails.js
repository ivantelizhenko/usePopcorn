import { useEffect, useRef, useState } from 'react';
import { Loader, ErrorMessage, MessageRated } from './Messages';
import StarRating from './StartRating';
import { useKey } from './useKey';

export default function MovieDetails({
  KEY,
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);

  const countRef = useRef(0);

  useEffect(() => {
    if (rating) countRef.current++;
  }, [rating]);

  const {
    Title: title,
    Year: year,
    Plot: plot,
    Runtime: runtime,
    imdbRating,
    Poster: poster,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ')[0]),
      userRating: rating,
      countRatingDecision: countRef.current,
    };

    onAddWatched(newWatchedMovie);
  }

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);

  function handleFindUserRating() {
    const findFilm = watched.filter(el => el.imdbID === selectedId);
    return findFilm.at(0).userRating;
  }

  useKey('Escape', onCloseMovie);

  // useEffect(() => {
  //   function callback(e) {
  //     if (e.code === 'Escape') onCloseMovie();
  //   }

  //   document.addEventListener('keydown', callback);

  //   return () => document.removeEventListener('keydown', callback);
  // }, [onCloseMovie]);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        if (!res.ok)
          throw new Error('Something went wrong with fentching movie');

        const data = await res.json();

        setMovie({ ...data, userRating: rating });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [selectedId, KEY]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie: ${title}`;

    return () => (document.title = 'usePopcorn');
  }, [title]);
  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={() => onCloseMovie()}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {isWatched ? (
                <MessageRated>{handleFindUserRating()}</MessageRated>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    rating={rating}
                    setRating={setRating}
                  />

                  {rating ? (
                    <button
                      className="btn-add"
                      onClick={() => {
                        handleAdd();
                      }}
                    >
                      + Add to list
                    </button>
                  ) : (
                    ''
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
