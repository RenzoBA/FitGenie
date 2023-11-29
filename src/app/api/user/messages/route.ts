import { getAuthSession } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import { MessageValidator } from "@/lib/validators/message";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized access", { status: 401 });
    }

    const user = await User.findOne({ email: session.user?.email });

    return NextResponse.json(user?.messagesLiked ?? [], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
};

export const PATCH = async (req: Request) => {
  try {
    await connectDB();
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized access", { status: 401 });
    }

    const body = await req.json();
    const message = MessageValidator.parse(body);
    const email = session.user?.email;

    const isMessageLiked = await User.findOne({
      email,
      messagesLiked: message,
    });

    let userUpdated;

    if (isMessageLiked) {
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

    return NextResponse.json(userUpdated.messagesLiked, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
};
