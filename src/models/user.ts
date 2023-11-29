import { Decimal128 } from "mongodb";
import { model, Schema, models } from "mongoose";

const messageLikedSchema = new Schema({
  _id: String,
  isUserMessage: Boolean,
  text: String,
  like: Boolean,
});

const UserSchema = new Schema({
  _id: String,
  name: String,
  email: String,
  image: String,
  emailVerified: Boolean,
  age: { type: Number, min: 18, max: 70 },
  sex: { type: String, enum: ["male", "female"] },
  height: { type: Decimal128, min: 0, default: 0 },
  weight: { type: Decimal128, min: 0, default: 0 },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced", "expert"],
  },
  goal: String,
  motivation: String,
  messagesLiked: [messageLikedSchema],
});

export const User = models.User || model("User", UserSchema);
