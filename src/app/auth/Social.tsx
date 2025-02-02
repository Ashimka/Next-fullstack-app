"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  return (
    <>
      <Image
        src={"/yandex.svg"}
        width={48}
        height={48}
        alt="logo yandex"
        onClick={handleSignInYandex}
      />
    </>
  );
};

export default Social;
