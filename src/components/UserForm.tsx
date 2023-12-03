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
import { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pen, Save } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { UserFormRequest } from "@/lib/validators/user-form";
import { useRouter } from "next/navigation";

interface UserFormProps {
  user: User;
}

const UserForm: FC<UserFormProps> = ({ user }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<UserFormRequest>({
    _id: user._id,
    image: user.image,
    name: user.name,
    age: user.age,
    sex: user.sex,
    height: +user.height.$numberDecimal,
    weight: +user.weight.$numberDecimal,
    level: user.level,
    goal: user.goal,
    motivation: user.motivation,
  });

  const { mutate: updateUser, isLoading: updateUserLoading } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (currentUser: UserFormRequest) => {
      const payload: UserFormRequest = currentUser;

      const { data } = await axios.put("/api/user", payload);

      return data;
    },
    onSuccess: (currentUserData) => {
      queryClient.setQueryData(["user"], currentUserData);
      router.refresh();

      toast({
        title: "Updated successfully",
        description: "Your info was updated",
      });
    },
  });

  const handleStringUserData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleNumberUserData = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentUser((prev) => ({ ...prev, [e.target.id]: +e.target.value }));
  };

  const handleImageUser = (image: File) => {
    if (image) {
      const reader = new FileReader();

      reader.readAsDataURL(image);

      reader.onloadend = () => {
        setCurrentUser((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
    }
  };

  const handleSexUser = (sex: "male" | "female") => {
    setCurrentUser((prev) => ({ ...prev, sex }));
  };

  const handleLevelUser = (
    level: "beginner" | "intermediate" | "advanced" | "expert"
  ) => {
    setCurrentUser((prev) => ({ ...prev, level }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUser(currentUser);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid w-full justify-center items-center gap-2">
        <div className="relative py-5">
          <Input
            disabled={updateUserLoading}
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => handleImageUser(e.target.files![0])}
            className="hidden"
          />
          <Avatar className="h-60 w-60 border border-border shadow">
            <AvatarImage src={currentUser.image} alt="user-picture" />
            <AvatarFallback className="uppercase text-9xl">
              {currentUser?.name?.split(" ")[0][0]}
            </AvatarFallback>
          </Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="cursor-pointer absolute right-2 bottom-8 bg-muted border border-border py-2 px-3 rounded-lg text-primary text-sm font-normal"
            >
              <div className="flex flex-row gap-1 items-center shadow">
                <Pen size={18} />
                <span>Edit</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="absolute -left-4 top-1 w-32">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <label
                    htmlFor="image"
                    className="w-full p-0 h-fit font-medium cursor-pointer"
                  >
                    Update photo
                  </label>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={currentUser.image === ""}>
                  <Button
                    onClick={() =>
                      setCurrentUser((prev) => ({ ...prev, image: "" }))
                    }
                    className="flex flew-row items-center justify-start gap-1 w-full p-0 h-fit"
                    variant="ghost"
                    type="button"
                  >
                    Remove photo
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid items-center gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          required
          disabled={updateUserLoading}
          type="text"
          id="name"
          placeholder="Name"
          value={currentUser?.name}
          minLength={3}
          onChange={(e) => handleStringUserData(e)}
          className="sm:max-w-[24rem]"
        />
        <p className="text-sm text-muted-foreground">
          This is the name that will be used by FitGenie Coach to communicate
          with you.
        </p>
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="age">Age</Label>
        <Input
          required
          disabled={updateUserLoading}
          type="number"
          id="age"
          placeholder="Age"
          value={currentUser?.age}
          onChange={(e) => handleNumberUserData(e)}
          min={18}
          max={70}
          className="sm:max-w-[12rem]"
        />
        <p className="text-sm text-muted-foreground">
          This is the age that will be used to customized your workout routines.
        </p>
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="height">Height</Label>
        <Input
          required
          disabled={updateUserLoading}
          type="number"
          id="height"
          placeholder="Height (ft)"
          value={currentUser?.height}
          onChange={(e) => handleNumberUserData(e)}
          min={0}
          step={0.1}
          className="sm:max-w-[12rem]"
        />
        <p className="text-sm text-muted-foreground">
          This is the height in feets (ft) that will be used to evaluate your
          progress.
        </p>
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="weight">Weight</Label>
        <Input
          required
          disabled={updateUserLoading}
          type="number"
          id="weight"
          placeholder="Weight (lb)"
          value={currentUser?.weight}
          onChange={(e) => handleNumberUserData(e)}
          min={0}
          step={0.1}
          className="sm:max-w-[12rem]"
        />
        <p className="text-sm text-muted-foreground">
          This is the height in pounds (lb) that will be used to evaluate your
          progress.
        </p>
      </div>
      <RadioGroup
        required
        disabled={updateUserLoading}
        id="sex"
        value={currentUser?.sex}
        onValueChange={(sex: "male" | "female") => handleSexUser(sex)}
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
            disabled={updateUserLoading}
            defaultValue="beginner"
            value={currentUser?.level}
            onValueChange={(
              level: "beginner" | "intermediate" | "advanced" | "expert"
            ) => handleLevelUser(level)}
          >
            <SelectTrigger className="sm:max-w-[12rem]">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
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
          disabled={updateUserLoading}
          id="goal"
          placeholder={`Examples: "Reduce 10 lb in 2 months by going to the gym 3 times a week", "Strengthen my legs by training with dumbbells at home", "Run 10 km in 30 minutes".`}
          value={currentUser?.goal}
          onChange={(e) => handleStringUserData(e)}
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
          disabled={updateUserLoading}
          id="motivation"
          placeholder={`Examples: "Arrive in good shape for the next summer", "Win my first triathlon competition", "Impress my ex ;)".`}
          value={currentUser?.motivation}
          onChange={(e) => handleStringUserData(e)}
          rows={5}
        />
        <p className="text-sm text-muted-foreground">
          This is the motivation that will be considered to customize the
          FitGenie Coach answers. Please be detailed.
        </p>
      </div>
      <Button type="submit" variant="default" className="w-full">
        <div className="flex flew-row justify-center items-center gap-1 w-full">
          {updateUserLoading ? (
            <Loader2 size={18} className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save size={18} className="mr-2 h-4 w-4" />
          )}
          <span>Save</span>
        </div>
      </Button>
    </form>
  );
};

export default UserForm;
