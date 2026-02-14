import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import ProtectedRoute from "../components/protectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main */}
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 bg-gray-50 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
