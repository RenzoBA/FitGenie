"use client";

import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { UserProtectedContext } from "@/context/user-protected";

const UserForm = () => {
  const { data, userLoading } = useContext(UserProtectedContext);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { mutate: updateUser, isLoading: updateUserLoading } = useMutation({
    mutationKey: ["userID"],
    mutationFn: async (user: User) => {
      const res = await fetch(`/api/user?id=${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return res.body;
    },
  });

  const { toast } = useToast();
  const [userData, setUserData] = useState<User>({
    name: "",
    age: "",
    sex: "",
    height: "",
    weight: "",
    level: "",
    goal: "",
    motivation: "",
  });

  const handleChange = (
    e: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (typeof e === "string") {
      if (e === "male" || e === "female") {
        setUserData({
          ...userData,
          sex: e,
        });
      } else {
        setUserData({
          ...userData,
          level: e,
        });
      }
    } else {
      setUserData({
        ...userData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUser(userData);
    toast({
      title: "Updated successfully",
      description: "Your info was updated",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid items-center gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          autoFocus
          disabled={userLoading || updateUserLoading}
          type="text"
          id="name"
          placeholder="Name"
          value={userData.name || data?.user?.name}
          onChange={handleChange}
          className="w-96"
        />
        <p className="text-sm text-muted-foreground">
          This is the name that will be used by FitGenie Coach to communicate
          with you.
        </p>
      </div>

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="age">Age</Label>
        <Input
          disabled={userLoading || updateUserLoading}
          type="number"
          id="age"
          placeholder="Age"
          value={userData.age || data?.user?.age}
          onChange={handleChange}
          min={18}
          max={60}
          className="w-52"
        />
        <p className="text-sm text-muted-foreground">
          This is the age that will be used to customized your workout routines.
        </p>
      </div>

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="height">Height</Label>
        <Input
          disabled={userLoading || updateUserLoading}
          type="number"
          id="height"
          placeholder="Height (ft)"
          value={userData.height || data?.user?.height}
          onChange={handleChange}
          className="w-52"
        />
        <p className="text-sm text-muted-foreground">
          This is the height that will be used to evaluate your progress.
        </p>
      </div>

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="weight">Weight</Label>
        <Input
          disabled={userLoading || updateUserLoading}
          type="number"
          id="weight"
          placeholder="Weight (lb)"
          value={userData.weight || data?.user?.weight}
          onChange={handleChange}
          className="w-52"
        />
        <p className="text-sm text-muted-foreground">
          This is the height that will be used to evaluate your progress.
        </p>
      </div>

      <RadioGroup
        disabled={userLoading || updateUserLoading}
        id="sex"
        value={userData.sex || data?.user?.sex}
        onValueChange={handleChange}
        className="grid w-full items-center gap-2"
      >
        <Label htmlFor="sex">Sex</Label>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="male" id="male" />
          <Label htmlFor="male" className="font-normal">
            Male
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="female" />
          <Label htmlFor="female" className="font-normal">
            Female
          </Label>
        </div>
        <p className="text-sm text-muted-foreground">
          This is the sex that will be used to customized your workout routines.
        </p>
      </RadioGroup>

      <div
        id="level"
        className="flex flex-col gap-3 items-center col-start-1 col-end-5 w-full"
      >
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="level">Level</Label>
          <Select
            disabled={userLoading || updateUserLoading}
            value={userData.level || data?.user?.level}
            onValueChange={handleChange}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advance">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            This is the level that will be used to customized your workout
            routines.
          </p>
        </div>
        <ul className="text-[0.7rem] space-y-1 text-muted-foreground">
          <li>
            * Beginner Level (0-6 months): individuals who are in the early
            stages of their training. They are beginners who are still getting
            familiar with the basic concepts of training and physical fitness.
          </li>
          <li>
            * Intermediate Level (6 months - 2 years): Individuals who have been
            consistently training for a regular period of time. They have
            acquired basic knowledge of exercise techniques, developed a
            foundation of strength and endurance.
          </li>
          <li>
            * Advanced Level (2-5 years): Individuals who have achieved a higher
            level of strength, endurance, and physical skills. Additionally,
            they have acquired more advanced knowledge in training, nutrition,
            and recovery.
          </li>
          <li>
            * Expert Level (more than 5 years): Individuals who have reached an
            exceptional level of physical conditioning, strength, and endurance.
            They have extensive knowledge of various exercise modalities,
            advanced training techniques, and specialized approaches to
            nutrition and recovery.
          </li>
        </ul>
      </div>

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="goal">Goal</Label>
        <Textarea
          disabled={userLoading || updateUserLoading}
          id="goal"
          placeholder={`Examples: "Reduce 10 lb in 2 months by going to the gym 3 times a week", "Strengthen my legs by training with dumbbells at home", "Run 10 km in 30 minutes".`}
          value={userData.goal || data?.user?.goal}
          onChange={handleChange}
          rows={5}
        />
        <p className="text-sm text-muted-foreground">
          This is the goal that will be considered to customize the FitGenie
          Coach answers. Please be detailed.
        </p>
      </div>

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="motivation">Motivation</Label>
        <Textarea
          disabled={userLoading || updateUserLoading}
          id="motivation"
          placeholder={`Examples: "Arrive in good shape for the next summer", "Win my first triathlon competition", "Impress my ex ;)".`}
          value={userData.motivation || data?.user?.motivation}
          onChange={handleChange}
          rows={5}
        />
        <p className="text-sm text-muted-foreground">
          This is the motivation that will be considered to customize the
          FitGenie Coach answers. Please be detailed.
        </p>
      </div>

      <Button type="submit" variant="outline" className="w-full">
        {updateUserLoading ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          "Save"
        )}
      </Button>
    </form>
  );
};

export default UserForm;
