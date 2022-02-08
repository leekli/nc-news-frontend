import styles from "../css/Nav.module.css";
import React from "react";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

const Nav = () => {
  return (
    <nav className={styles.Nav}>
      <Link className="Nav__Link" to="/articles">
        Articles |
      </Link>
      <Link className="Nav__Link" to="/topics">
        {" "}
        Topics |
      </Link>
      <Link className="Nav__Link" to="/Users">
        {" "}
        Users
      </Link>
      <UserProfile />
    </nav>
  );
};

export default Nav;
