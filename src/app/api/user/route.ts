import { getAuthSession } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import { UserFormValidator } from "@/lib/validators/user-form";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const GET = async () => {
  try {
    await connectDB();

    const session = await getAuthSession();

    const user = await User.findOne({ email: session?.user?.email });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error }, { status: 404 });
  }
};

export const PUT = async (req: Request) => {
  try {
    await connectDB();

    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized access", { status: 401 });
    }

    const body = await req.json();

    const { image, _id, ...restUserData } = UserFormValidator.parse(body);

    let userUpdated;

    if (!image) {
      await cloudinary.uploader.destroy(_id);

      userUpdated = await User.findOneAndUpdate(
        { email: session.user?.email },
        { ...restUserData, image: "" },
        {
          new: true,
        }
      );
    } else {
      const { secure_url } = await cloudinary.uploader.upload(image, {
        public_id: _id,
      });

      userUpdated = await User.findOneAndUpdate(
        { email: session.user?.email },
        { ...restUserData, image: secure_url },
        {
          new: true,
        }
      );
    }

    return NextResponse.json(userUpdated, { status: 202 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 404 });
  }
};
