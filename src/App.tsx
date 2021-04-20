import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import Films from "./components/ListFilms";
import GroupedSelect from "./components/Select";
import FilmInfo from "./components/FilmInfo";
import getMovies, { FilmType, MovieType, Year } from "./Api";

function App() {
  const [filmsArr, setFilmsArr] = useState<FilmType[]>([]);

  const [movieType, setMovieType] = React.useState<MovieType>("tv");

  const [year, setYear] = useState<Year>("All");

  useEffect(() => {
    getMovies(movieType, year).then((movies: FilmType[]) => {
      setFilmsArr(movies);
    });
  }, [movieType, year]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route
          exact
          path="/:FilmId"
          render={() => <FilmInfo filmsArr={filmsArr} />}
        />
        <Route
          exact
          path="/"
          render={() => (
            <>
              <GroupedSelect
                movieType={movieType}
                setMovieType={setMovieType}
                year={year}
                setYear={setYear}
              />
              <Films filmsArr={filmsArr} />
            </>
          )}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
