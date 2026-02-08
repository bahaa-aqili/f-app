"use client";

import { useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { User } from "@/app/types/types";

export default function CreateUserDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<User>({
    uid: "",
    username: "",
    email: "",
    age: 0,
    role: 2,
  });
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleCreateUser = async () => {
    if (!form.username || !form.email || !form.age) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    const newDocRef = doc(collection(db, "users"));
    const id = newDocRef.id;

    await setDoc(newDocRef, {
      uid: id,
      username: form.username,
      email: form.email,
      age: Number(form.age),
      role: 2,
      createdAt: serverTimestamp(),
    });

    setLoading(false);
    setForm({ uid: "", username: "", email: "", age: 0, role: 2 });
    onClose();
    alert("User Created ✅");
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-black p-6 rounded-lg w-80 space-y-3">
        <h3 className="text-lg font-semibold">Create New User</h3>

        <input
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={form?.username || ""}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form?.email || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="number"
          placeholder="Age"
          className="w-full border p-2 rounded"
          value={form?.age || ""}
          onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>

          <button
            onClick={handleCreateUser}
            disabled={loading}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
