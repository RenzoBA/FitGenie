"use client";

import { MessagesContext } from "@/context/messages";
import { UserProtectedContext } from "@/context/user-protected";
import { cn } from "@/lib/utils";
import { Message } from "@/lib/validators/message";
import { useMutation } from "@tanstack/react-query";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { FC, HTMLAttributes, useContext, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";

interface ChatbotInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatbotInput: FC<ChatbotInputProps> = ({ className }) => {
  const [input, setInput] = useState<string>("");
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  const { data, params } = useContext(UserProtectedContext);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async (_message: Message) => {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, params, messages }),
      });
      return res.body;
    },
    onMutate(message) {
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream found");

      const _id = crypto.randomUUID();
      const responseMessage: Message = {
        _id,
        isUserMessage: false,
        text: "",
        like: false,
      };

      addMessage(responseMessage);

      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(_id, (prev) => prev + chunkValue);
      }

      setInput("");
      setIsMessageUpdating(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
    onError: (_, message) => {
      alert("Something went wrong. Please try again.");
      removeMessage(message._id);
      textareaRef.current?.focus();
    },
  });

  return (
    <div className={cn("border-t border-border", className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          disabled={isLoading}
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              const message: Message = {
                _id: crypto.randomUUID(),
                isUserMessage: true,
                text: input,
                like: false,
              };
              sendMessage(message);
            }
          }}
          rows={2}
          maxRows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message..."
          className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-transparent py-1.5 text-primary focus:ring-0 text-sm sm:leading-6 focus:outline-none placeholder-muted-foreground"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center px-1 font-sans text-muted-foreground">
            {isLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Button
                variant="ghost"
                type="submit"
                className="px-0"
                onClick={() => {
                  const message: Message = {
                    _id: crypto.randomUUID(),
                    isUserMessage: true,
                    text: input,
                    like: false,
                  };
                  sendMessage(message);
                }}
              >
                <CornerDownLeft className="w-3 h-3" />
              </Button>
            )}
          </kbd>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 border-t border-border peer-focus:border-t-1 peer-focus:border-primary"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ChatbotInput;
