"use client";
import ProtectedRoute from "./components/protectedRoute";

export default function Home() {
  return (
    <ProtectedRoute
      requireAuth={false}
      authenticatedRedirectTo="/dashboard"
      unauthenticatedRedirectTo="/login"
    >
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    </ProtectedRoute>
  );
}
