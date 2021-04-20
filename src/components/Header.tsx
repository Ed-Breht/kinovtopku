import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import popcorn from "../components/klipartz.com.png";
import styles from "../components/Header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to="/" className={styles.HeaderWrapper}>
      <AppBar position="static">
        <Toolbar>
          <img alt="" className={styles.img} src={popcorn} />
          <Typography variant="h5">Киновтопку</Typography>
        </Toolbar>
      </AppBar>
    </Link>
  );
};

export default Header;
