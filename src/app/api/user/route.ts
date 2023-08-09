import { decrypt } from "@/helpers/functions/encrypt";
import connectDB from "@/lib/mongoose";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const email = decrypt(id!);

    const user = await User.findOne({ email });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
};

export const PUT = async (req: Request) => {
  try {
    await connectDB();

    const formData = await req.formData();
    const infoToUpdate = Object.fromEntries(formData);

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const email = decrypt(id!);

    const userUpdated = await User.findOneAndUpdate({ email }, infoToUpdate, {
      new: true,
    });

    return NextResponse.json(userUpdated, { status: 202 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
};
