"use client";
import { useState, useEffect } from "react";
import { Search, Plus, Edit2 } from "lucide-react";
import { User } from "@/app/types/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import CreateUserDialog from "@/app/components/CreateUserDialog";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // filter users with role 2 (regular users)
        const q = query(collection(db, "users"), where("role", "==", 2));
        const snapshot = await getDocs(q);

        const usersList = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            uid: doc.id,
            username: data.username || "",
            email: data.email || "",
            age: data.age || 0,
            createdAt: data.createdAt,
            role: data.role,
            // add other User properties if needed
          } as User;
        });

        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [open]);

  // searching
  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()),
  );

  // Sorting
  if (sortType === "alphabetic") {
    filteredUsers.sort((a, b) => a.username.localeCompare(b.username));
  }

  if (sortType === "age") {
    filteredUsers.sort((a, b) => a.age - b.age);
  }

  if (sortType === "created") {
    filteredUsers.sort(
      (a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0),
    );
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <>
              {/* header*/}
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">All Users</h1>
                </div>
                <div className="flex items-center gap-4">
                  {/* sarch*/}
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search by username or email..."
                      className="pl-10 pr-4 py-2 text-gray-900 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  {/* create new user*/}
                  <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-100"
                  >
                    <Plus size={18} />
                    <span>Create New User</span>
                  </button>
                  {/* sort filter*/}
                  <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl text-xs text-gray-500 cursor-pointer">
                    <button
                      onClick={() => setShowFilter(!showFilter)}
                      className="border px-4 py-2 rounded bg-gray-100"
                    >
                      Filter
                    </button>
                    {showFilter && (
                      <div className="absolute bg-white border mt-1 rounded shadow w-48">
                        <p
                          onClick={() => {
                            setSortType("alphabetic");
                            setShowFilter(false);
                          }}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Sort A → Z
                        </p>
                        <p
                          onClick={() => {
                            setSortType("created");
                            setShowFilter(false);
                          }}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Sort by Created Date
                        </p>
                        <p
                          onClick={() => {
                            setSortType("age");
                            setShowFilter(false);
                          }}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          Sort by Age
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* table*/}
              {filteredUsers.length === 0 ? (
                <p className="p-6 text-black">No users found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="px-6 py-4 text-gray-400 font-medium text-sm">
                          User Name
                        </th>
                        <th className="px-6 py-4 text-gray-400 font-medium text-sm">
                          Email
                        </th>
                        <th className="px-6 py-4 text-gray-400 font-medium text-sm">
                          Age
                        </th>
                        <th className="px-6 py-4 text-gray-400 font-medium text-sm">
                          Created At
                        </th>
                        <th className="px-6 py-4 text-gray-400 font-medium text-sm">
                          User role
                        </th>
                        <th className="px-6 py-4 text-gray-400 font-medium text-sm text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredUsers.map((user) => (
                        <tr
                          key={user.uid}
                          onClick={() =>
                            router.push(`/dashboard/users/${user.uid}`)
                          }
                          className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                        >
                          <td className="px-6 py-4 text-gray-800 font-medium">
                            {user.username}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {user.age}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {user.createdAt?.toDate().toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {user.role}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {/* edit button*/}
                            <button className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all border border-emerald-100">
                              <Edit2 size={12} />
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {/* الفوتر: الترقيم (Pagination)
              <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm">
                  Showing data 1 to 8 of{" "}
                  <span className="font-semibold text-gray-700">
                    256K entries
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg text-sm font-medium">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                    3
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                    4
                  </button>
                  <span className="text-gray-400 px-1">...</span>
                  <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                    40
                  </button>
                  <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div> */}
            </>
          )}
        </div>
      </div>
      {/* Dialog for creating new user */}
      <CreateUserDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
