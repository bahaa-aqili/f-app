"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Read from localStorage only on client side
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserEmail(parsedUser.email || "");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 border-gray-300">
      {/* Search */}
      <div className="relative w-80">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        <Bell className="text-gray-700 cursor-pointer" />

        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-gray-600">{userEmail}</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
