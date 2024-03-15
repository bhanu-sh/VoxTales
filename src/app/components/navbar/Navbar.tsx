import React from "react";
import Links from "./links/Links";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between m-3">
        <h1 className="logo text-4xl">
          Vox<span className={styles.logo2}>Tales</span>
        </h1>
        <div className="">
        <Links />
        </div>
      </nav>
    </>
  );
};

export default Navbar;