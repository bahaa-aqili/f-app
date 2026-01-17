// types.ts
import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  username: string;
  email: string;
  age: number;
  password: string | number;
  role: 1 | 2; // 1 admin, 2 user
  createdAt?: Timestamp;
}
