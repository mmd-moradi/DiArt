import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

interface NewUserReq {
  userName: string;
  email: string;
  password: string;
}

interface NewUserRes {
  id: string;
  userName: string;
  email: string;
}

export const POST = async (req: NextRequest) => {
  const { userName, email, password } = (await req.json()) as NewUserReq;
  await dbConnect();
  const oldUser = await UserModel.findOne({ email });
  if (oldUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 422 });
  }
  const user = await UserModel.create({ userName, email, password });
  return NextResponse.json(
    {
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    },
    { status: 200 },
  );
};
