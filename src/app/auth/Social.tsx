"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Auth.module.css";

const Social = () => {
  const router = useRouter();

  const handleSignInVk = () => {
    const clientId = process.env.NEXT_PUBLIC_VK_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/vk/callback`
    );
    const scope = "name"; // Запрашиваемые права
    const vkAuthUrl = `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&v=5.131`;

    router.push(vkAuthUrl);
  };
  return (
    <div className={styles.social_images} onClick={handleSignInVk}>
      <Image src={"/vk.svg"} width={48} height={48} alt="logo vk" />
    </div>
  );
};

export default Social;
