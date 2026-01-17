// "use client";

// import { updatePassword } from "firebase/auth";
// import { auth } from "../lib/firebase";
// import { useState } from "react";

// export default function ResetPassword() {
//   const [password, setPassword] = useState("");

//   const reset = async () => {
//     if (auth.currentUser) {
//       await updatePassword(auth.currentUser, password);
//       setPassword("");
//       alert("Password Updated");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-700 to-blue-500 px-4">
//       <div className="w-full max-w-sm rounded-2xl bg-[#5882C147]/28 p-6 shadow-xl text-white border border-white/30 backdrop-blur-md">
//         {/* Title */}
//         <h1 className="text-2xl font-bold mb-6">Reset Password</h1>

//         {/* ResetPassword */}
//         <div className="mb-2">
//           <label className="text-sm mb-1 block">New Password</label>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="Enter New Password"
//             className="w-full rounded-md px-3 py-2 text-gray-800 bg-amber-50"
//           />
//         </div>

//         {/* submit */}
//         <button
//           className="w-full bg-blue-900 hover:bg-blue-950 transition rounded-md py-2 font-semibold"
//           onClick={reset}
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// }
