"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = localStorage.getItem("user");

  // useEffect(() => {

  //   if (!user) {
  //   }
  // }, []);

  router.replace("/login");
  return <>{children}</>;
}
