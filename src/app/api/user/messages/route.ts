import { decrypt } from "@/helpers/functions/encrypt";
import connectDB from "@/lib/mongoose";
import { Message } from "@/lib/validators/message";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const email = decrypt(id!);

    const user = await User.findOne({ email });

    let userMessagesLiked: Message[];
    if (user) {
      userMessagesLiked = user.messagesLiked;
    } else {
      userMessagesLiked = [];
    }

    return NextResponse.json(userMessagesLiked, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
};

export const PUT = async (req: Request) => {
  try {
    await connectDB();

    const { _message } = await req.json();

    const message = {
      _id: _message._id,
      isUserMessage: _message.isUserMessage,
      text: _message.text,
    };

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const email = decrypt(id!);

    const user = await User.findOne({
      email,
      messagesLiked: message,
    });

    let userUpdated;
    if (user) {
      userUpdated = await User.findOneAndUpdate(
        { email },
        { $pull: { messagesLiked: message } },
        { new: true }
      );
    } else {
      userUpdated = await User.findOneAndUpdate(
        { email },
        { $push: { messagesLiked: message } },
        { new: true }
      );
    }

    return NextResponse.json({ userUpdated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
};
