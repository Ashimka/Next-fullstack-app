"use client";
import { useLogoutUser } from "@/hooks/useLogout";
import { useGetOneUser } from "@/hooks/users/useOneUser";

import styles from "./Profile.module.css";
import Button from "@/components/ui/Button";

const Profile = () => {
  const { isLoading, oneUser } = useGetOneUser();
  const { logout } = useLogoutUser();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>PROFILE page</h2>
        <Button variant="secondary" onClick={() => logout()}>
          Выйти
        </Button>
      </div>
      {isLoading && <p>Loading...</p>}
      {oneUser && <p>{oneUser.name}</p>}
    </div>
  );
};

export default Profile;
