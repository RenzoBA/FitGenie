"use client";

import { useContext } from "react";
import { Switch } from "./ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "./ui/badge";
import { MessagesContext } from "@/context/messages";

const ChatbotParams = () => {
  const { params, setParams } = useContext(MessagesContext);

  const handleCheckedChange = () => {
    setParams((prevParams) => ({
      ...prevParams,
      mood: prevParams.mood === "friendly" ? "rude" : "friendly",
    }));
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-y border-input">
      <Label htmlFor="mood" className="text-xs">
        Friendly
      </Label>
      <Switch
        id="mood"
        checked={params.mood === "rude"}
        onCheckedChange={handleCheckedChange}
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary"
      />
      <Label htmlFor="mood" className="text-xs">
        Rude
      </Label>
      <Badge variant="secondary">BETA</Badge>
    </div>
  );
};

export default ChatbotParams;
