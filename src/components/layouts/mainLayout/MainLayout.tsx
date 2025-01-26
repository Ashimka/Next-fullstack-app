import Link from "next/link";
import React, { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <>
      <div className="container">
        <header className="bg-[#221831] text-white">
          <span className="mr-2">LOGO</span>
          header top
          <Link className="ml-2 text-purple-700" href={"/auth"}>
            Auth
          </Link>
        </header>
        <main className="main">{children}</main>
        <footer className="bg-[#99b3c6]">Footer</footer>
      </div>
    </>
  );
};

export default MainLayout;
