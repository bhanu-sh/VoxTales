"use client"
import styles from "./navLink.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  path: string;
}

const NavLink = ({ item }: { item: NavItem }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${
        pathName === item.path ? styles.active : ''
      }`}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;