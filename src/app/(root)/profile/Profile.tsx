"use client";
import { useLogoutUser } from "@/hooks/useLogout";
import { useGetOneUser } from "@/hooks/users/useOneUser";

import styles from "./Profile.module.css";
import Button from "@/components/ui/Button";
import UserInfo from "@/components/layouts/mainLayout/user/UserInfo";
import { useState } from "react";
import CurrentOrder from "@/components/layouts/mainLayout/order/CurrentOrder";
import OrderHistory from "@/components/layouts/mainLayout/order/OrderHistory";

type Tab = "profile" | "currentOrder" | "orderHistory";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const { isLoading, oneUser } = useGetOneUser();
  const { logout } = useLogoutUser();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className="text-3xl font-bold">Личный кабинет</h2>
        <Button variant="secondary" onClick={() => logout()}>
          Выйти
        </Button>
      </div>
      {isLoading && <p>Loading...</p>}
      {oneUser && (
        <div>
          <div className="flex space-x-4 mb-8">
            <Button
              variant={activeTab === "profile" ? "primary" : "notactive"}
              onClick={() => setActiveTab("profile")}
            >
              Профиль
            </Button>
            <Button
              onClick={() => setActiveTab("currentOrder")}
              variant={activeTab === "currentOrder" ? "primary" : "notactive"}
            >
              Текущий заказ
            </Button>
            <Button
              onClick={() => setActiveTab("orderHistory")}
              variant={activeTab === "orderHistory" ? "primary" : "notactive"}
            >
              История заказов
            </Button>
          </div>

          {activeTab === "profile" && <UserInfo />}
          {activeTab === "currentOrder" && <CurrentOrder />}
          {activeTab === "orderHistory" && <OrderHistory />}
        </div>
      )}
    </div>
  );
};

export default Profile;
