"use client";

import { useContext } from "react";
import { Switch } from "./ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "./ui/badge";
import { MessagesContext } from "@/context/messages";
import { Separator } from "./ui/separator";

// Objeto de mapeo para las propiedades y valores correspondientes
const propertyMap: Record<string, Record<string, string>> = {
  ["treatment"]: { true: "rude", false: "educated" },
  ["length"]: { true: "detailed", false: "concise" },
  ["mood"]: { true: "funny", false: "serious" },
};

const ChatbotParams = () => {
  const { params, setParams } = useContext(MessagesContext);

  const handleCheckedChange = (isChecked: boolean, id: string) => {
    if (propertyMap[id]) {
      setParams((prev) => ({
        ...prev,
        [id]: isChecked ? propertyMap[id]["true"] : propertyMap[id]["false"],
      }));
    }
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 border-y border-input">
      <div className="flex flex-row items-center justify-center gap-2">
        <Label htmlFor="treatment" className="text-xs">
          Educated
        </Label>
        <Switch
          id="treatment"
          checked={params.treatment === "rude"}
          value={params.treatment}
          onCheckedChange={(isChecked) =>
            handleCheckedChange(isChecked, "treatment")
          }
          className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary"
        />
        <Label htmlFor="treatment" className="text-xs">
          Rude
        </Label>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-row items-center justify-center gap-2">
        <Label htmlFor="length" className="text-xs">
          Concise
        </Label>
        <Switch
          id="length"
          checked={params.length === "detailed"}
          value={params.length}
          onCheckedChange={(isChecked) =>
            handleCheckedChange(isChecked, "length")
          }
          className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary"
        />
        <Label htmlFor="length" className="text-xs">
          Detailed
        </Label>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-row items-center justify-center gap-2">
        <Label htmlFor="mood" className="text-xs">
          Serious
        </Label>
        <Switch
          id="mood"
          checked={params.mood === "funny"}
          value={params.mood}
          onCheckedChange={(isChecked) =>
            handleCheckedChange(isChecked, "mood")
          }
          className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary"
        />
        <Label htmlFor="mood" className="text-xs">
          Funny
        </Label>
      </div>
      <Badge variant="secondary">BETA</Badge>
    </div>
  );
};

export default ChatbotParams;
