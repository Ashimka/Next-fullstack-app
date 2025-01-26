import { PropsWithChildren } from "react";
import MainLayout from "@/components/layouts/mainLayout/MainLayout";

export default function Layout({ children }: PropsWithChildren) {
  return <MainLayout>{children}</MainLayout>;
}
