"use client";

import { useEffect, useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/contexts/authContext";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Podcasts",
    path: "/podcasts",
  },
  {
    title: "Genres",
    path: "/podcasts/genres",
  },
];

const Links = () => {
  const router = useRouter();
  const { avatar, user, loggedin, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {loggedin ? (
          <>
            <img
              src={avatar}
              alt="user avatar"
              className="rounded-full h-12 w-12"
            />
            {/* {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />} */}
            <button className={styles.logout} onClick={logout}>Logout</button>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      {open ? (
        <Image
          src="/icons/navClose.svg"
          width={40}
          height={40}
          alt="menu button"
          className={styles.menuButton}
          onClick={() => setOpen((prev) => !prev)}
        />
      ) : (
        <Image
          src="/icons/NavOpen.png"
          width={40}
          height={40}
          alt="menu button"
          className={styles.menuButton}
          onClick={() => setOpen((prev) => !prev)}
        />
      )}
      {/* <Image src="/icons/mobileNav.png" width={40} height={40} className={styles.menuButton} onClick={() => setOpen((prev) => !prev)}></Image> */}
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
