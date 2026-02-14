"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // useEffect(() => {

  //   if (!user) {
  // const user = localStorage.getItem("user");
  //   }
  // }, []);

  router.replace("/login");
  return <>{children}</>;
}
