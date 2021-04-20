import React from "react";
import styles from "./Select.module.scss";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
} from "@material-ui/core";
import { MovieType, Year } from "../Api";

type Props = {
  movieType: MovieType;
  setMovieType: (type: MovieType) => void;
  year: Year;
  setYear: (year: Year) => void;
};

const GroupedSelect: React.FC<Props> = ({
  movieType,
  setMovieType,
  year,
  setYear,
}) => {
  const handleChangeType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovieType(event.target.value as MovieType);
  };

  const handleChangeYear = (event: React.ChangeEvent<{ value: unknown }>) => {
    setYear(event.target.value as number | "All");
  };

  return (
    <div className={styles.SelectWrapper}>
      <FormControl className={styles.Changer}>
        <InputLabel htmlFor="yearSelect">Год</InputLabel>
        <Select native id="yearSelect" onChange={handleChangeYear} value={year}>
          <option key={"All"} value={"All"}>
            {"All"}
          </option>
          {[...new Array(100)].map((el, index) => {
            const year = new Date().getFullYear() - index;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <RadioGroup row value={movieType} onChange={handleChangeType}>
        <FormControlLabel
          labelPlacement="top"
          value="movie"
          control={<Radio />}
          label="Movie"
        />
        <FormControlLabel
          labelPlacement="top"
          value="tv"
          control={<Radio />}
          label="TV"
        />
      </RadioGroup>
    </div>
  );
};

export default GroupedSelect;
