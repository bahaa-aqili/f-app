"use client";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const reset = async () => {
    const user = auth.currentUser;

    if (!user || !user.email) {
      setMessage("❌ User not authenticated");
      return;
    }

    // new password validation
    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      // Re-verify with old password
      const credential = EmailAuthProvider.credential(user.email, oldPassword);

      await reauthenticateWithCredential(user, credential);

      // Update to new password
      await updatePassword(user, newPassword);

      setMessage("✅ Password updated successfully");

      // clean states
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-700 to-blue-500 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-[#5882C147]/28 p-6 shadow-xl text-white border border-white/30 backdrop-blur-md">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6">Reset Password</h1>

        {/* ResetPassword */}
        <div className="mb-2">
          <label className="text-sm mb-1 block">Password</label>
          <input
            onChange={(e) => setOldPassword(e.target.value)}
            type="password"
            placeholder="Enter Current Password"
            className="w-full rounded-md px-3 py-2 text-gray-800 bg-amber-50"
          />
        </div>

        <hr className="p-3" />

        <div className="mb-2">
          <label className="text-sm mb-1 block">New Password</label>
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="Enter New Password"
            className="w-full rounded-md px-3 py-2 text-gray-800 bg-amber-50"
          />
        </div>

        <div className="mb-2">
          <label className="text-sm mb-1 block"> Confirm New Password</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm New Password"
            className="w-full rounded-md px-3 py-2 text-gray-800 bg-amber-50"
          />
        </div>

        <hr className="p-3" />
        {/* submit */}
        <button
          className="w-full bg-blue-900 hover:bg-blue-950 transition rounded-md py-2 font-semibold"
          onClick={reset}
        >
          Reset
        </button>

        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
}
