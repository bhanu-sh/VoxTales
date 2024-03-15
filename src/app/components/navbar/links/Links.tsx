"use client";

import { useEffect, useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

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
  const [avatar, setAvatar] = useState("https://www.gravatar.com/avatar/?d=mp");
  const [session, setSession] = useState(false);
  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      setSession(false);
      router.push("/login");
    } catch (error: any) {
      console.error("Error logging out", error.message);
      toast.error(error.message);
    }
  }

  const getAvatar = async () => {
    try {
      const res = await axios.get("/api/users/me")
      console.log(res.data);
      setAvatar(res.data.data.avatar);
      setSession(true);
    } catch (error: any) {
      console.error("Error getting user details", error.message);
      // toast.error("Error getting user details");
    }
  }

  useEffect(() => {
    getAvatar();
  } , []);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session ? (
          <>
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
