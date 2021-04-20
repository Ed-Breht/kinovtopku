import React from "react";
import { FilmType } from "../Api";
import styles from "../components/ListFilms.module.scss";
import { Link } from "react-router-dom";

type Props = {
  filmsArr: FilmType[];
};

const Films: React.FC<Props> = ({ filmsArr }) => {
  return (
    <div className={styles.Wrapper}>
      {filmsArr.map((e: FilmType) => (
        <Link className={styles.FilmItem} to={`/${e.id}`}>
          <img alt="" src={e.poster_path} className={styles.img} />
          <div className={styles.TextInfo}>
            <h1>{e.title}</h1>
            {e.release_data}
            <div>{e.description}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Films;
