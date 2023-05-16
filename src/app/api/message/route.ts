import { chatbotPrompt } from "@/helpers/constants/chatbot-prompt"
import { ChatGPTMessage } from "@/lib/openai-stream"
import { MessageArraySchema } from "@/lib/validators/message"

export const POST = async(req: Request) => {
  const {messages} = await req.json()

  const parsedMessages = MessageArraySchema.parse(messages)

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map(message => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text
  }))

  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt
  })
}