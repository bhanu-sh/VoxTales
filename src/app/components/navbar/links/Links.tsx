"use client";

import { useEffect, useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/contexts/authContext";
import Link from "next/link";

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
  {
    title: "Artists",
    path: "/artists",
  }
];

const Links = () => {
  const router = useRouter();
  const { loggedin, userLogout, artistLogout } = useAuth();
  const [open, setOpen] = useState(false);
  // const [avatarSrc, setAvatarSrc] = useState("");

  // useEffect(() => {
  //   // Check if localStorage is available (i.e., if running on the client side)
  //   if (typeof window !== "undefined") {
  //     const userItem = localStorage.getItem("user");
  //     if (userItem && JSON.parse(userItem).avatar !== null && JSON.parse(userItem).avatar !== undefined) {
  //       setAvatarSrc(JSON.parse(userItem).avatar);
  //     }
  //   }
  // }, [loggedin]);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {loggedin ? (
          <>
            <Link href="/profile">
              <button>Profile</button>
            </Link>
            {/* {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />} */}
            <button className={styles.logout} onClick={artistLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink item={{ title: "Login", path: "/login" }} />
            <NavLink item={{ title: "Signup", path: "/signup" }} />
          </>
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
          src="/icons/navOpen.png"
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
