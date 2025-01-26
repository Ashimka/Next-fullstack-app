import { Metadata } from "next";
import Auth from "./Auth";

export const metadata: Metadata = {
  title: "Авторизация",
};

const Authpage = () => {
  return <Auth />;
};

export default Authpage;
