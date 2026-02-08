"use client";
import { useState } from "react";
import Image from "next/image";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      router.push("/otp");
    } catch (error) {
      console.log(error);
      alert("Login failed, Please check your email or password.");
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/otp");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-700 to-blue-500 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-[#5882C147]/28 p-6 shadow-xl text-white border border-white/30 backdrop-blur-md">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm mb-1 block">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="username@gmail.com"
            className="w-full rounded-md px-3 py-2 text-gray-800 bg-amber-50"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="text-sm mb-1 block">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-md px-3 py-2 text-gray-800 bg-amber-50"
          />
        </div>

        {/* Sign in */}
        <button
          className="w-full bg-blue-900 hover:bg-blue-950 transition rounded-md py-2 font-semibold"
          onClick={login}
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center j my-4 text-xs opacity-80">
          <span className="px-2">or continue with</span>
        </div>

        {/* Social login */}
        <div className="flex justify-center gap-3 mb-4">
          <button
            className="bg-white text-black p-2 rounded-md w-12 flex justify-center"
            onClick={googleLogin}
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              width={20}
              height={20}
              className="w-5"
            />
          </button>
        </div>

        {/* Register */}
        <p className="text-xs text-center">Don’t have an account yet?</p>
      </div>
    </div>
  );
}
