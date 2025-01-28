import Link from "next/link";
import { ShoppingCart, LogIn } from "lucide-react";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>MyStore</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/about">About</Link>
        </nav>
        <div className={styles.icons}>
          <Link href="/cart">
            <ShoppingCart />
          </Link>
          <Link href="/auth">
            <LogIn />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
