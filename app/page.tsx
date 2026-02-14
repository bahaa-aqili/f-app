// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   useEffect(() => {
//     const localUser = localStorage.getItem("user");

//     if (localUser !== null) {
//       router.replace("/dashboard");
//     } else {
//       router.replace("/login");
//     }
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // تأكد من أننا في المتصفح
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      if (typeof window !== "undefined") {
        const localUser = localStorage.getItem("user");

        if (localUser !== null) {
          router.replace("/dashboard");
        } else {
          router.replace("/login");
        }
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
    } finally {
      setIsChecking(false);
    }
  };
  // اعرض loader أثناء الفحص
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return null;
}
