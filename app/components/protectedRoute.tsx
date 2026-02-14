"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
  authenticatedRedirectTo?: string;
  unauthenticatedRedirectTo?: string;
};

export default function ProtectedRoute({
  children,
  requireAuth = true,
  authenticatedRedirectTo,
  unauthenticatedRedirectTo = "/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    try {
      const localUser = localStorage.getItem("user");
      const isAuthenticated = localUser !== null;

      if (requireAuth && !isAuthenticated) {
        if (
          unauthenticatedRedirectTo &&
          pathname !== unauthenticatedRedirectTo
        ) {
          router.replace(unauthenticatedRedirectTo);
        }
        return;
      }

      if (!requireAuth) {
        const target = isAuthenticated
          ? authenticatedRedirectTo
          : unauthenticatedRedirectTo;

        if (target && pathname !== target) {
          router.replace(target);
        }
        return;
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
    } finally {
      setIsChecking(false);
    }
  }, [
    requireAuth,
    authenticatedRedirectTo,
    unauthenticatedRedirectTo,
    pathname,
    router,
  ]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
