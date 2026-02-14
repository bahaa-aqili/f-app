"use client";
import ProtectedRoute from "./components/protectedRoute";

export default function Home() {
  return (
    <ProtectedRoute
      requireAuth={false}
      authenticatedRedirectTo="/dashboard"
      unauthenticatedRedirectTo="/login"
    >
      <></>
    </ProtectedRoute>
  );
}
