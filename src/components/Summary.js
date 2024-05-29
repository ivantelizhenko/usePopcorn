const average = arr =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function round(el) {
  return Math.round(10 * el) / 10;
}

export default function Summary({ watched }) {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating));
  const avgUserRating = average(watched.map(movie => movie.userRating));
  const avgRuntime = average(watched.map(movie => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{round(avgImdbRating)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{round(avgUserRating)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{round(avgRuntime)} min</span>
        </p>
      </div>
    </div>
  );
}
