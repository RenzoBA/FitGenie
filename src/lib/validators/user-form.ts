import { z } from "zod";

export const UserFormValidator = z.object({
  _id: z.string(),
  image: z.string(),
  name: z.string(),
  age: z.number().min(18).max(70),
  sex: z.enum(["male", "female"]),
  height: z.number().min(0).step(0.1),
  weight: z.number().min(0).step(0.1),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  goal: z.string(),
  motivation: z.string(),
});

export type UserFormRequest = z.infer<typeof UserFormValidator>;
