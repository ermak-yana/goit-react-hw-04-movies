import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import moviesApi from "../services/moviesApi";
import ErrorView from "../views/NotFoundView";
import Loader from "../components/Loader/Loader";
import noImageFound from "../images/not_found.gif";
import Status from "../services/status";
import baseImageURL from "../services/baseImageURL";
import s from "./Cast.module.css";

export default function Cast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    moviesApi
      .getCastInfo(movieId)
      .then((cast) => {
        setActors(cast);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId, error]);

  return (
    <>
      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorView />}

      {status === Status.RESOLVED && (
        <ul className={s.cast}>
          {actors.map((actor) => (
            <li key={actor.id} className={s.item}>
              <img
                src={
                  actor.profile_path
                    ? `${baseImageURL}${actor.profile_path}`
                    : noImageFound
                }
                alt={actor.original_name}
                className={s.photo}
              />
              <h4 className={s.name}>{actor.original_name}</h4>
              <p className={s.character}>{actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
