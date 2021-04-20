import React from "react";
import { useParams } from "react-router-dom";
import { FilmType } from "../Api";
import styles from "../components/FilmInfo.module.scss";
import CaruselFilmInfo from "./CaruselFilmInfo";

type Params = {
  FilmId: string;
};

type Props = {
  filmsArr: FilmType[];
};

const FilmInfo: React.FC<Props> = ({ filmsArr }) => {
  let { FilmId } = useParams<Params>();
  const TargetFilm = filmsArr.find((x) => x.id === Number(FilmId));

  return (
    <div className={styles.Wrapper}>
      <div className={styles.FilmInfo}>
        <img alt="" className={styles.img} src={TargetFilm?.poster_path} />
        <div className={styles.FilmInfoText}>
          <h1>{TargetFilm?.title}</h1>
          <div>{TargetFilm?.description}</div>
          <div>Actors:</div>
          <div>{TargetFilm?.team}</div>
        </div>
        {TargetFilm && <CaruselFilmInfo TargetFilm={TargetFilm} />}
      </div>
    </div>
  );
};

export default FilmInfo;
