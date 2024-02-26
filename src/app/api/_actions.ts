"use server";
import { v2 as cloudinary } from "cloudinary";
import DArtModel, { DArt } from "@/models/DArt";
import UserModel, { User } from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { FileWithPath } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { Session } from "next-auth";
import { Document } from "mongoose";
import { get } from "http";

type FunctionProps = {
  version: string;
  signature: string;
  public_id: string;
  secure_url: string;
  dArtName: string;
  nCopies: string;
  pricePerCopy: string;
  description: string;
  session: Session;
};

type SaveBanFunctionProps = {
  version: string;
  signature: string;
  public_id: string;
  secure_url: string;
  session: Session;
};

export type DArtDataType = {
  name: string;
  nCopies: number;
  uuid: string;
  description: string;
  owner: string;
  ownerUsername: string;
  imageUrl: string;
  price: number;
  price_id: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function getsigniture(folder?: string) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: folder || "diArt",
    },
    cloudinaryConfig.api_secret!,
  );
  return { timestamp, signature };
}

export async function saveToDatabase({
  public_id,
  signature,
  version,
  secure_url,
  dArtName,
  nCopies,
  pricePerCopy,
  session,
  description,
}: FunctionProps) {
  const expectedSignature = cloudinary.utils.api_sign_request(
    {
      public_id,
      version,
    },
    cloudinaryConfig.api_secret!,
  );
  if (expectedSignature !== signature) {
    return false;
  }
  const { user } = session;
  if (!user) {
    return false;
  }
  await dbConnect();
  const currentUser = await UserModel.findOne({ email: user.email });
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  const uuid = uuidv4();
  const dArt = await DArtModel.create({
    name: dArtName,
    nCopies: parseInt(nCopies),
    description,
    owner: currentUser._id,
    ownerUsername: currentUser.userName,
    uuid,
    imageUrl: secure_url,
    price: parseInt(pricePerCopy),
  });
  const updatedUser = await UserModel.updateOne(
    { _id: currentUser._id },
    { $push: { createdArts: uuid } },
  );
  return true;
}

export async function saveBannerToDb({
  public_id,
  secure_url,
  session,
  signature,
  version,
}: SaveBanFunctionProps) {
  const expectedSignature = cloudinary.utils.api_sign_request(
    {
      public_id,
      version,
    },
    cloudinaryConfig.api_secret!,
  );
  if (expectedSignature !== signature) {
    return false;
  }
  const { user } = session;
  if (!user) {
    return false;
  }
  await dbConnect();
  const currentUser = await UserModel.findOne({ email: user.email });
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  const updatedUser = await UserModel.updateOne(
    { _id: currentUser._id },
    { bannerImage: secure_url },
  );
  return true;
}

export async function saveProfileImgToDb({
  public_id,
  secure_url,
  session,
  signature,
  version,
}: SaveBanFunctionProps) {
  const expectedSignature = cloudinary.utils.api_sign_request(
    {
      public_id,
      version,
    },
    cloudinaryConfig.api_secret!,
  );
  if (expectedSignature !== signature) {
    return false;
  }
  const { user } = session;
  if (!user) {
    return false;
  }
  await dbConnect();
  const currentUser = await UserModel.findOne({ email: user.email });
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  const updatedUser = await UserModel.updateOne(
    { _id: currentUser._id },
    { profileImage: secure_url },
  );
  return true;
}

export async function getUserData(
  session: Session | null,
): Promise<User | undefined> {
  if (!session) {
    throw new Error("Unauthorized");
  }
  const { user } = session;
  if (!user) {
    throw new Error("Unauthorized");
  }
  await dbConnect();
  const currentUser = await UserModel.findOne({ email: user.email });
  if (!currentUser) {
    throw new Error("Unauthorized");
  }
  const data = JSON.parse(JSON.stringify(currentUser));
  return data;
}

export async function getDArtsData(uuids: string[] | undefined) {
  if (!uuids) {
    return [];
  }
  await dbConnect();
  const dArts = [];
  for (let uuid of uuids) {
    const dArt = await DArtModel.findOne({ uuid });
    const dArtData = JSON.parse(JSON.stringify(dArt));
    if (!dArt) {
      continue;
    }
    dArts.push(dArtData);
  }
  return dArts;
}

export async function getDArtsDataByUUID(
  uuid: string,
): Promise<DArtDataType | null> {
  await dbConnect();
  const dArt = await DArtModel.findOne({ uuid });
  if (!dArt) {
    return null;
  }
  const dArtData = JSON.parse(JSON.stringify(dArt));
  return dArtData;
}

export async function getFeaturedDArts(): Promise<DArtDataType[]> {
  await dbConnect();
  const dArt = await DArtModel.find({ featured: true });
  const dArtData = JSON.parse(JSON.stringify(dArt));
  return dArtData;
}
