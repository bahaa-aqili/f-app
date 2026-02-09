"use client";

import { KeyRound, LayoutDashboard, LogOut, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useEffect } from "react";

const menu = [
  {
    title: "Menu",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
      { name: "Users", icon: Users, href: "/dashboard/users" },
    ],
  },
  {
    title: "Others",
    items: [
      { name: "Reset Password", icon: KeyRound, href: "/reset-password" },
      { name: "Log Out", icon: LogOut, href: "/login" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    router.push("/login");
  };

  // useEffect(() => {
  //   localStorage.clear();
  // }, [handleLogout()]);

  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r px-5 py-6 border-gray-300">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
          F
        </div>
        <span className="font-semibold text-indigo-600">F-app</span>
      </div>

      {menu.map((section) => (
        <div key={section.title} className="mb-8">
          <p className="text-xs text-gray-400 uppercase mb-3">
            {section.title}
          </p>

          <ul className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <li
                  key={item.name}
                  onClick={() => {
                    if (item.icon === LogOut) {
                      handleLogout();
                    }
                  }}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                      ${
                        active
                          ? "bg-indigo-100 text-indigo-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
