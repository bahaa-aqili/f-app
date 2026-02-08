"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useParams } from "next/navigation";
import { User } from "@/app/types/types";
import { Eye, EyeOff } from "lucide-react";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  // fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "users", id as string);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setUser({ uid: snap.id, ...snap.data() } as User);
      }
    };

    fetchUser();
  }, [id]);

  // update user data
  const handleUpdate = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const docRef = doc(db, "users", id as string);

      await updateDoc(docRef, {
        username: user.username,
        email: user.email,
        age: Number(user.age),
        password: user.password,
        role: user.role,
      });

      alert("User updated successfully ✅");
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
    setLoading(false);
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-300 overflow-hidden flex flex-col gap-6 p-6 justify-center-safe items-center text-gray-900 ">
        {/* heeadre */}
        <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">User Details</h1>
          </div>
        </div>

        <label>Username</label>
        <input
          placeholder="Username"
          className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
          disabled={!editing}
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <label>Email</label>
        <input
          placeholder="Email"
          className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
          disabled={!editing}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label>Age</label>
        <input
          placeholder="Age"
          className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
          disabled={!editing}
          type="number"
          value={user.age}
          onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
        />

        <label>Password</label>
        <div className="relative w-full md:w-64">
          <input
            placeholder="Password"
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
            disabled={!editing}
            type={show ? "text" : "password"}
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {!editing ? (
          <button
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-100"
            onClick={() => setEditing(true)}
          >
            ✏️ Edit
          </button>
        ) : (
          <button
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-100"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        )}
      </div>
    </div>
  );
}
