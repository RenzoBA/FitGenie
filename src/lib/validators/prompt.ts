import { z } from "zod";
import { MessageArrayValidator } from "./message";

const paramsValidator = z.object({
  mood: z.enum(["friendly", "rude"]),
});

export const promptValidator = z.object({
  params: paramsValidator,
  messages: MessageArrayValidator,
});

export type promptRequest = z.infer<typeof promptValidator>;
