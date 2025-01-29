"use client";
import { useGetOneUser } from "@/hooks/users/useOneUser";
import React from "react";

const Profilepage = () => {
  const { isLoading, oneUser } = useGetOneUser();
  return (
    <div>
      PROFILE page
      {isLoading && <p>Loading...</p>}
      {oneUser && <p>{oneUser.name}</p>}
    </div>
  );
};

export default Profilepage;
