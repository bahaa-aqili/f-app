"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  console.log("ProtectedRoute");
  async function checkAuth() {
    try {
      if (typeof window !== "undefined") {
        const localUser = localStorage.getItem("user");
        if (localUser === null) {
          router.replace("/login");
        }
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return <>{children}</>;
}
