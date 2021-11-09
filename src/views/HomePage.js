import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "../components/Loader/Loader";
import Status from "../services/status";
import moviesApi from "../services/moviesApi";
import ErrorView from "../views/NotFoundView";
import s from "./HomePage.module.css";
import noImageFound from "../images/not_found.gif";
function HomePage() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    moviesApi
      .getPopularMovies()
      .then((results) => {
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [error]);

  return (
    <main className={s.container}>
      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorView />}

      {status === Status.RESOLVED && (
        <>
          <b className={s.titleMovies}>Trending movies</b>
          <ul className={s.moviesList}>
            {movies.map(({ id, poster_path, title }) => (
              <li key={id} className={s.moviesItem}>
                <Link
                  to={{
                    pathname: `movies/${id}`,
                  }}
                >
                  <img
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : noImageFound
                    }
                    alt={title}
                    className={s.poster}
                  />
                </Link>
                <div className={s.titleBox}>
                  <p className={s.title}>{title}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default HomePage;
