export function Loader() {
  return <p className="loader">Loading...</p>;
}

export function ErrorMessage({ message }) {
  return <p className="error">⛔️{message}</p>;
}

export function MessageRated({ children }) {
  return <p>You rated with movie {children}⭐️</p>;
}
