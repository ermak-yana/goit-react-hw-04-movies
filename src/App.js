import { Switch, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import AppBar from "./components/AppBar/AppBar";

const HomePage = lazy(() =>
  import("./views/HomePage.js" /* webpackChunkName: "home-page"*/)
);
const MoviesPage = lazy(() =>
  import("./views/MoviesPage" /* webpackChunkName: "movies-page"*/)
);
const MovieDetailsPage = lazy(() =>
  import("./views/MovieDetailsPage" /* webpackChunkName: "movie-details-page"*/)
);
const NotFoundView = lazy(() =>
  import("./views/NotFoundView" /* webpackChunkName: "not-found-view"*/)
);

export default function App() {
  return (
    <div className="App">
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer
        autoClose={3000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
