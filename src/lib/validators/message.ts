import { z } from "zod";

export const MessageValidator = z.object({
  _id: z.string(),
  isUserMessage: z.boolean(),
  text: z.string(),
  like: z.boolean(),
});

export const MessageArrayValidator = z.array(MessageValidator);

export type MessageRequest = z.infer<typeof MessageValidator>;
