"use client";

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
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
import { Loader2, Pen, Save } from "lucide-react";
import { UserProtectedContext } from "@/context/user-protected";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { uploadFile } from "@/helpers/functions/upload-file";
import { useSession } from "next-auth/react";

const UserForm = () => {
  const [user, setUser] = useState<User>({
    image: "",
    name: "",
    age: "",
    sex: "",
    height: "",
    weight: "",
    level: "",
    goal: "",
    motivation: "",
  });

  const { data, refetchData, dataLoading } = useContext(UserProtectedContext);
  const { update } = useSession();

  useEffect(() => {
    const getUser = () => {
      if (data?.user) {
        setUser(data?.user);
      }
    };
    getUser();
  }, [data?.user]);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { toast } = useToast();

  const { mutate: updateUser, isLoading: updateUserLoading } = useMutation({
    mutationKey: ["userID"],
    mutationFn: async (user: User) => {
      const userPhotoURL = await uploadFile(user.image! as File, "image");

      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("age", user.age);
      formData.append("sex", user.sex);
      formData.append("height", user.height);
      formData.append("weight", user.weight);
      formData.append("level", user.level);
      formData.append("goal", user.goal);
      formData.append("motivation", user.motivation);
      formData.append("image", userPhotoURL);

      const res = await fetch(`/api/user?id=${id}`, {
        method: "PUT",
        body: formData,
      });
      refetchData();
      update();
      toast({
        title: "Updated successfully",
        description: "Your info was updated",
      });
      return res.body;
    },
  });

  const handleChange = (
    e: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (typeof e === "string") {
      if (e === "male" || e === "female") {
        setUser((prevUser) => ({
          ...prevUser,
          sex: e,
        }));
      } else if (
        e === "beginner" ||
        e === "intermediate" ||
        e === "advanced" ||
        e === "expert"
      ) {
        setUser((prevUser) => ({
          ...prevUser,
          level: e,
        }));
      }
    } else if (e.target.id === "image") {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        setUser((prevUser) => ({
          ...prevUser,
          image: target.files![0],
        }));
      }
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [e.target.id]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUser(user!);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid w-full justify-center items-center gap-2">
        <div className="relative py-5">
          <Input
            disabled={dataLoading || updateUserLoading}
            id="image"
            name="image"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            className="hidden"
          />
          <Avatar className="h-60 w-60 border border-border">
            <AvatarImage
              src={
                typeof user?.image! === "string"
                  ? user?.image
                  : URL.createObjectURL(user?.image!)
              }
              alt="user-picture"
            />
            <AvatarFallback className="uppercase text-9xl">
              {user?.name?.split(" ")[0][0]}
            </AvatarFallback>
          </Avatar>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="cursor-pointer absolute right-2 bottom-8 bg-muted border border-border py-2 px-3 rounded-lg text-primary text-sm font-normal"
            >
              <div className="flex flex-row gap-1 items-center">
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
                <DropdownMenuItem disabled={user?.image === ""}>
                  <Button
                    onClick={() => setUser({ ...user, image: "" })}
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
          autoFocus
          disabled={dataLoading || updateUserLoading}
          type="text"
          id="name"
          placeholder="Name"
          value={user?.name}
          minLength={3}
          onChange={handleChange}
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
          disabled={dataLoading || updateUserLoading}
          type="number"
          id="age"
          placeholder="Age"
          value={user?.age}
          onChange={handleChange}
          min={18}
          max={60}
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
          disabled={dataLoading || updateUserLoading}
          type="number"
          id="height"
          placeholder="Height (ft)"
          value={user?.height}
          onChange={handleChange}
          className="sm:max-w-[12rem]"
        />
        <p className="text-sm text-muted-foreground">
          This is the height that will be used to evaluate your progress.
        </p>
      </div>

      <div className="grid w-full items-center gap-2">
        <Label htmlFor="weight">Weight</Label>
        <Input
          required
          disabled={dataLoading || updateUserLoading}
          type="number"
          id="weight"
          placeholder="Weight (lb)"
          value={user?.weight}
          onChange={handleChange}
          className="sm:max-w-[12rem]"
        />
        <p className="text-sm text-muted-foreground">
          This is the height that will be used to evaluate your progress.
        </p>
      </div>

      <RadioGroup
        required
        disabled={dataLoading || updateUserLoading}
        id="sex"
        value={user?.sex}
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
            disabled={dataLoading || updateUserLoading}
            value={user?.level}
            onValueChange={handleChange}
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
          disabled={dataLoading || updateUserLoading}
          id="goal"
          placeholder={`Examples: "Reduce 10 lb in 2 months by going to the gym 3 times a week", "Strengthen my legs by training with dumbbells at home", "Run 10 km in 30 minutes".`}
          value={user?.goal}
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
          disabled={dataLoading || updateUserLoading}
          id="motivation"
          placeholder={`Examples: "Arrive in good shape for the next summer", "Win my first triathlon competition", "Impress my ex ;)".`}
          value={user?.motivation}
          onChange={handleChange}
          rows={5}
        />
        <p className="text-sm text-muted-foreground">
          This is the motivation that will be considered to customize the
          FitGenie Coach answers. Please be detailed.
        </p>
      </div>

      <Button type="submit" variant="default" className="w-full">
        {updateUserLoading ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : (
          <div className="flex flew-row justify-center items-center gap-1 w-full">
            <Save size={18} />
            <span>Save</span>
          </div>
        )}
      </Button>
    </form>
  );
};

export default UserForm;
