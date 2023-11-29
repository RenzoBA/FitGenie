import { MessageRequest } from "@/lib/validators/message";
import { Params } from "@/types/params";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface MessagesProviderProps {
  children: ReactNode;
}
export const MessagesContext = createContext<{
  messages: MessageRequest[];
  addMessage: (message: MessageRequest) => void;
  handlelikeMessage: (message: MessageRequest) => void;
  streamMessage: (id: string, updateFn: (prevText: string) => string) => void;
  params: {
    mood: "friendly" | "rude";
  };
  setParams: Dispatch<SetStateAction<Params>>;
}>({
  messages: [],
  addMessage: () => {},
  handlelikeMessage: () => {},
  streamMessage: () => {},
  params: {
    mood: "friendly",
  },
  setParams: () => {},
});

export const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const [messages, setMessages] = useState<MessageRequest[]>([
    {
      _id: crypto.randomUUID(),
      isUserMessage: false,
      text: "Hi big boy, how can I help you today? 😀💪",
      like: false,
    },
  ]);
  const [params, setParams] = useState<Params>({ mood: "friendly" });

  const addMessage = (message: MessageRequest) => {
    setMessages((prev) => [...prev, message]);
  };

  const handlelikeMessage = (message: MessageRequest) => {
    setMessages((prev) =>
      prev.map((prevMessage) =>
        prevMessage._id === message._id
          ? { ...prevMessage, like: !prevMessage.like }
          : prevMessage
      )
    );
  };

  const streamMessage = (
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
        addMessage,
        handlelikeMessage,
        streamMessage,
        params,
        setParams,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
