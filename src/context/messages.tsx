import { Message } from "@/lib/validators/message";
import { ReactNode, createContext, useState } from "react";

interface MessagesProviderProps {
  children: ReactNode;
}
export const MessagesContext = createContext<{
  messages: Message[];
  isMessageUpdating: boolean;
  addMessage: (message: Message) => void;
  likeMessage: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  likeMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

export const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      _id: crypto.randomUUID(),
      isUserMessage: false,
      text: "Hola chico grande, en qué puedo ayudarte hoy? 😀💪",
      like: false,
    },
  ]);
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const likeMessage = (message: Message) => {
    setMessages((prev) =>
      prev.map((prevMessage) =>
        prevMessage === message
          ? { ...message, like: !message.like }
          : prevMessage
      )
    );
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message._id !== id));
  };

  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string
  ) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message._id === id) {
          return { ...message, text: updateFn(message.text) };
        }
        return message;
      })
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isMessageUpdating,
        addMessage,
        likeMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
