"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Auth.module.css";

const Social = () => {
  const router = useRouter();

  const handleSignInYandex = () => {
    const redirectUri = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/yandex`
    );
    const clientId = process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID;
    const yandexAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    router.push(yandexAuthUrl);
  };

  const handleSignInVk = () => {
    const clientId = process.env.NEXT_PUBLIC_VK_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/vk`
    );
    const scope = "name"; // Запрашиваемые права
    const vkAuthUrl = `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&v=5.131`;

    router.push(vkAuthUrl);
  };
  return (
    <div className={styles.social_images}>
      <Image
        src={"/yandex.svg"}
        width={48}
        height={48}
        alt="logo yandex"
        onClick={handleSignInYandex}
      />
      <Image
        src={"/vk.svg"}
        width={48}
        height={48}
        alt="logo vk"
        onClick={handleSignInVk}
      />
    </div>
  );
};

export default Social;
