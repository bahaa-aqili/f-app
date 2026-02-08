"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "../lib/firebase";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const submit = () => {
    if (otp === "1234") {
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: auth.currentUser?.uid,
          email: auth.currentUser?.email,
        }),
      );
      router.push("/dashboard");
    } else {
      alert("OTP Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-700 to-blue-500 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-[#5882C147]/28 p-6 shadow-xl text-white border border-white/30 backdrop-blur-md">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6">OTP</h1>

        {/* OTP NUM */}
        <div className="mb-2">
          <label className="text-sm mb-1 block">OTP Number</label>
          <input
            onChange={(e) => setOtp(e.target.value)}
            type="OTP"
            placeholder="Enter OTP (hint: 1234)"
            className="w-full rounded-md px-3 py-2 text-gray-800 bg-amber-50"
          />
        </div>

        {/* submit */}
        <button
          className="w-full bg-blue-900 hover:bg-blue-950 transition rounded-md py-2 font-semibold"
          onClick={submit}
        >
          Verify
        </button>
      </div>
    </div>
  );
}
