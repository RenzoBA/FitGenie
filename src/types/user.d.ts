import { Message } from "@/lib/validators/message";

export interface User {
  _id?: string;
  name: string;
  email?: string;
  image: File | string | null;
  emailVerified?: boolean;
  age: string;
  sex: string;
  height: string;
  weight: string;
  level: string;
  goal: string;
  motivation: string;
  messagesLiked?: Message[];
}
