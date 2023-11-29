"use client";

import { MessagesContext } from "@/context/messages";
import { cn } from "@/lib/utils";
import { MessageRequest } from "@/lib/validators/message";
import { useMutation } from "@tanstack/react-query";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { FC, HTMLAttributes, useContext, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { promptRequest } from "@/lib/validators/prompt";

interface ChatbotInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatbotInput: FC<ChatbotInputProps> = ({ className }) => {
  const [input, setInput] = useState<string>("");
  const { messages, addMessage, streamMessage, params } =
    useContext(MessagesContext);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { mutate: sendMessage, isLoading } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: async (currentUserMessage: MessageRequest) => {
      const payload: promptRequest = {
        params,
        messages: [...messages, currentUserMessage],
      };

      // const { data } = await axios.post("/api/message", payload);
      // return data;

      const res = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      return res.body;
    },
    onMutate(currentUserMessage: MessageRequest) {
      addMessage(currentUserMessage);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream found");

      const _id = crypto.randomUUID();
      const currentSystemMessage: MessageRequest = {
        _id,
        isUserMessage: false,
        text: "",
        like: false,
      };

      addMessage(currentSystemMessage);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        streamMessage(_id, (prev) => prev + chunkValue);
      }

      setInput("");

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 10);
    },
    onError: (error) => {
      console.error(error);

      toast({
        title: "Ups! Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="border-t border-border">
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          disabled={isLoading}
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              const message: MessageRequest = {
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
          className="peer disabled:opacity-50 pl-2 pr-14 resize-none block w-full border-0 bg-transparent py-1.5 text-primary focus:ring-0 text-sm sm:leading-6 focus:outline-none placeholder-muted-foreground"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center px-1 font-sans text-muted-foreground">
            {isLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Button
                variant="ghost"
                type="submit"
                onClick={() => {
                  const message: MessageRequest = {
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
