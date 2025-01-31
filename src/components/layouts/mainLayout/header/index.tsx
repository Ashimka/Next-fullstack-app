"use client";
import Link from "next/link";
import { ShoppingCart, LogIn, User, LoaderIcon } from "lucide-react";

import styles from "./Header.module.css";
import { useGetOneUser } from "@/hooks/users/useOneUser";

const Header = () => {
  const { isLoading, oneUser } = useGetOneUser();

  return (
    <header className={styles.header}>
      <div className="container">
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
            {oneUser ? (
              <Link href="/profile">
                {isLoading ? <LoaderIcon className="loading-animate" /> : <User />}
              </Link>
            ) : (
              <Link href="/auth">
                {isLoading ? <LoaderIcon className="loading-animate" /> : <LogIn />}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
