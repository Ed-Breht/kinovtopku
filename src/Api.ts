import axios from "axios";

const Api = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/",
  params: {
    api_key: "7da750a81ad75b053d6dea9c6930f956",
  },
});

export type FilmType = {
  release_data: string;
  popularity: number;
  id: number;
  title: string;
  poster_path: string;
  description: string;
  team: string;
  FromFilms: string[];
};

type GetMoviesResponse = {
  data: {
    results: {
      id: number;
      title: string;
      name?: string;
      poster_path: string;
      popularity: number;
      release_date: string;
      first_air_date?: string;
      overview: string;
    }[];
  };
};

export type Year = number | "All";

export type MovieType = "tv" | "movie";

const getTeam = async (id: number, type: MovieType = "movie") => {
  return (await Api.get(`${type}/${id}/credits`)).data.cast.map(
    (el: { name: string; character: string }) => {
      return {
        name: el.name,
        character: el.character,
      };
    }
  );
};

const getImages = async (id: number, type: MovieType = "movie") => {
  return (await Api.get(`${type}/${id}/images`)).data.backdrops.map(
    (el: { file_path: string }) => {
      return `https://image.tmdb.org/t/p/w500${el.file_path}`;
    }
  );
};

const getMovies = async (type: MovieType = "movie", year: Year) => {
  let response: GetMoviesResponse;

  if (year === "All") {
    response = await Api.get(`${type}/top_rated?page=10`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    response = await Api.get(`${type}/top_rated?year=${year}&page=10`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const Films = (
    await Promise.all(
      response.data.results.map(async (movie) => {
        const team = (await getTeam(movie.id, type))
          .map(
            (el: { name: string; character: string }) =>
              `${el.name}(${el.character})`
          )
          .join(", ");

        const images = await getImages(movie.id, type);

        return {
          release_data: movie.release_date || movie?.first_air_date || "",
          popularity: movie.popularity,
          id: movie.id,
          title: movie.title || movie?.name || "",
          poster_path: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
          description: movie.overview,
          team: team,
          FromFilms: images,
        };
      })
    )
  )
    .slice(0, 10)
    .reverse();

  return Films;
};

export default getMovies;
