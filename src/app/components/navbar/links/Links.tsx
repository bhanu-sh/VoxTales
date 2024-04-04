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
  },
];

const Links = () => {
  const router = useRouter();
  const { loggedin, logout, isAdmin } = useAuth();
  const [open, setOpen] = useState(false);

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
            {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <button className={styles.logout} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink item={{ title: "Login", path: "/login" }} />
            <NavLink item={{ title: "Signup", path: "/signup" }} />
            {/* <button className={styles.logout} onClick={logout}>
              Force Logout
            </button> */}
          </>
        )}
      </div>
      {open ? null : (
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
        <div className={styles.mobileNav}>
          <div className={styles.mobileLinks}>
            <Image
              src="/icons/navClose.svg"
              width={40}
              height={40}
              alt="menu button"
              className={styles.menuButton}
              onClick={() => setOpen((prev) => !prev)}
            />
            {links.map((link) => (
              <NavLink item={link} key={link.title} />
            ))}
            {loggedin ? (
              <>
                <Link href="/profile">
                  <button>Profile</button>
                </Link>
                {isAdmin && (
                  <NavLink item={{ title: "Admin", path: "/admin" }} />
                )}
                <button className={styles.logout} onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink item={{ title: "Login", path: "/login" }} />
                <NavLink item={{ title: "Signup", path: "/signup" }} />
                {/* <button className={styles.logout} onClick={logout}>
              Force Logout
            </button> */}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Links;
