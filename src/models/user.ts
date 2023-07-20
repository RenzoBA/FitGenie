import { model, Schema, models } from "mongoose";

const UserSchema = new Schema({
  _id: String,
  name: String,
  email: String,
  image: String,
  emailVerified: Boolean,
  age: String,
  sex: String,
  height: String,
  weight: String,
  level: String,
  goal: String,
  motivation: String,
});

export const User = models.User || model("User", UserSchema);
