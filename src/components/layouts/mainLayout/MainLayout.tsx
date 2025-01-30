import React, { PropsWithChildren } from "react";
import Header from "./header";

const MainLayout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <footer className="bg-[#99b3c6]">
        <div className="container">Footer</div>
      </footer>
    </>
  );
};

export default MainLayout;
