import { z } from "zod";
import { MessageArrayValidator } from "./message";

const paramsValidator = z.object({
  treatment: z.enum(["polite", "rude"]),
  length: z.enum(["detailed", "concise"]),
  mood: z.enum(["funny", "serious"]),
});

export const promptValidator = z.object({
  params: paramsValidator,
  messages: MessageArrayValidator,
});

export type promptRequest = z.infer<typeof promptValidator>;
