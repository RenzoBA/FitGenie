import { z } from "zod";

export const MessageSchema = z.object({
  _id: z.string(),
  isUserMessage: z.boolean(),
  text: z.string(),
  like: z.boolean(),
});

//array validator
export const MessageArraySchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
