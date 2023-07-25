"use client";

import { useContext } from "react";
import { Switch } from "./ui/switch";
import { Label } from "@/components/ui/label";
import { UserProtectedContext } from "@/context/user-protected";
import { Badge } from "./ui/badge";

const ChatbotParams = () => {
  const { params, setParams } = useContext(UserProtectedContext);

  const handleCheckedChange = () => {
    setParams((prevParams) => ({
      ...prevParams,
      mood: prevParams.mood === "friendly" ? "rude" : "friendly",
    }));
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b border-input">
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
