export default function Login() {
  return <div>صفحة تسجيل الدخول</div>;
}

// // pages/api/register.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import { addUser } from "../../lib/users";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { uid, username, email, age, role } = req.body;

//   try {
//     const userId = await addUser({ uid, username, email, age, role });
//     res.status(200).json({ success: true, userId });
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// }
