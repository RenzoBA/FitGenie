import { Message } from "@/lib/validators/message";

interface DecimalNumber {
  $numberDecimal: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean | null;
  age: number;
  sex: "male" | "female";
  height: DecimalNumber;
  weight: DecimalNumber;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  goal: string;
  motivation: string;
  messagesLiked: Message[];
}
