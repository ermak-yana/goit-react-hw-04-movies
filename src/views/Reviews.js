import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moviesApi from "../services/moviesApi";
import s from "./Reviews.module.css";
import Status from "../services/status";

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    moviesApi
      .getMovieReviews(movieId)
      .then((results) => {
        if (results.length === 0) {
          throw new Error("Sorry. We don't have any reviews on this movie yet");
        }
        setReviews(results);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  return (
    <>
      {status === Status.RESOLVED && (
        <ul className={s.item}>
          {reviews.map((review) => (
            <li key={review.id} className={s.text}>
              <h2 className={s.text}>{review.author}</h2>
              <p className={s.noReview}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}

      {status === Status.REJECTED && <p>{error.message}</p>}
    </>
  );
}
