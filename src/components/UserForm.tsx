"use client";

import { ChangeEvent, FC, FormEvent, useState } from "react";
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

interface User {
  name: string;
  age: string;
  sex: string;
  height: string;
  weight: string;
  level: string;
  goal: string;
}

const UserForm: FC = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState<User>({
    name: "",
    age: "",
    sex: "",
    height: "",
    weight: "",
    level: "",
    goal: "",
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
    console.log(userData);
    toast({
      title: "Updated successfully",
      description: "Your info was updated",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
        />
        <p className="text-sm text-muted-foreground">
          This is the name that will be used by FitGenie Coach to communicate
          with you.
        </p>
      </div>

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="age">Age</Label>
        <Input
          type="number"
          id="age"
          placeholder="Age"
          value={userData.age}
          onChange={handleChange}
          min={18}
          max={60}
          className="w-52"
        />
        <p className="text-sm text-muted-foreground">
          This is the age that will be used to customized your workout routines.
        </p>
      </div>

      <RadioGroup
        defaultValue="male"
        id="sex"
        value={userData.sex}
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

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="height">Height</Label>
        <Input
          type="number"
          id="height"
          placeholder="Height (ft)"
          value={userData.height}
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
          type="number"
          id="weight"
          placeholder="Weight (lb)"
          value={userData.weight}
          onChange={handleChange}
          className="w-52"
        />
        <p className="text-sm text-muted-foreground">
          This is the height that will be used to evaluate your progress.
        </p>
      </div>

      <div
        id="level"
        className="flex flex-col gap-3 items-center col-start-1 col-end-5 w-full"
      >
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="level">Level</Label>
          <Select value={userData.level} onValueChange={handleChange}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Select your level" />
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
          id="goal"
          placeholder={`Examples: "Reduce 10 lb in 2 months by going to the gym 3 times a week", "Strengthen my legs by training with dumbbells at home", "Run 10 km in 30 minutes".`}
          value={userData.goal}
          onChange={handleChange}
          rows={5}
        />
        <p className="text-sm text-muted-foreground">
          This is the goal that will be considered to customize the FitGenie
          Coach answers.
        </p>
      </div>

      <Button type="submit" variant="outline" className="w-full">
        Save
      </Button>
    </form>
  );
};

export default UserForm;
