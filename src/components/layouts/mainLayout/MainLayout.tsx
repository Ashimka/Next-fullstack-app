import React, { PropsWithChildren } from "react";
import Header from "./header";

const MainLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <>
      <div className="container">
        <Header />
        <main className="main">{children}</main>
        <footer className="bg-[#99b3c6]">Footer</footer>
      </div>
    </>
  );
};

export default MainLayout;
