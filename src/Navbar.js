import React from "react";
import logo from "./SS logo for website.png";
import { Button } from "@mui/material";
import styles from "./Navbar.module.css";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <img src={logo} />
      </div>

      <div className={styles.right}>
        <span className={styles.link}>
          <NavLink
            to="/"
          
            className={({ isActive }) => (isActive ? `${styles.active}` : `${styles.inactive}`)}
          >
            New enquiry
          </NavLink>
        </span>

        <span className={styles.link}>
          <NavLink
            to="/existed enquiry"
          
            className={({ isActive }) => (isActive ? `${styles.active}` : `${styles.inactive}`)}
          >
            Existing enquiry
          </NavLink>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
