import { chatbotPrompt } from "@/helpers/constants/chatbot-prompts";
import { getAuthSession } from "@/lib/auth";
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from "@/lib/openai-stream";
import { promptValidator } from "@/lib/validators/prompt";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized access", { status: 401 });
    }

    const user = await User.findOne({
      email: session.user?.email,
    });

    const body = await req.json();
    const { params, messages } = promptValidator.parse(body);

    const outboundMessages: ChatGPTMessage[] = messages.map((message) => ({
      role: message.isUserMessage ? "user" : "system",
      content: message.text,
    }));

    outboundMessages.unshift({
      role: "system",
      content: chatbotPrompt(user, params) as string,
    });

    const payload: OpenAIStreamPayload = {
      model: "gpt-3.5-turbo",
      messages: outboundMessages,
      temperature: 0.4,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 300,
      stream: true,
      n: 1,
    };

    const stream = await OpenAIStream(payload);

    return new Response(stream);
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
}
