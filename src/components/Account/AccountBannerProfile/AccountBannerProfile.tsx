"use client"
import { useCallback, useEffect, useState } from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import toast from "react-hot-toast";
import Image from "next/image";
import { MdOutlineModeEdit } from "react-icons/md";
import { getsigniture, saveBannerToDb } from "@/app/api/_actions";
import { getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { CloudinaryRes } from "@/app/(create)/create/page";
import { Session } from "next-auth";

export type Props = {
  session: Session;
  bannerUrl?: string;
}



const AccountBannerProfile = ({session, bannerUrl}: Props) => {
  const [uploadedImg, setUploadedImg] = useState<File>();
  const [uploadedImgUrl, setUploadedImgUrl] = useState(bannerUrl);
  const onDrop = useCallback((acceptedFile: File[], rejectedFile?: FileRejection[]) => {
    if(acceptedFile?.length) {
      const file = acceptedFile[0];
      setUploadedImg(file);
    }
    if(rejectedFile?.length) {
      toast.error("The file is not supported or more than 15MB")
    }
  },[])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {
    "image/*": []
  },
  maxSize: 1024 * 1024 * 15
})

  useEffect(() => {
    const handleBannerUpload = async () => {
      try {
        if (uploadedImg) {
          const formData = new FormData();
          const { signature, timestamp } = await getsigniture("diArt/profile");
          formData.append("file", uploadedImg);
          formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
          formData.append("signature", signature);
          formData.append("timestamp", timestamp.toString());
          formData.append("folder", "diArt/profile");      
          const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL!;
          const cloudinaryResponse = await fetch(endpoint, {
            method: "POST",
            body: formData,
          });
          const cloudinaryResData = (await cloudinaryResponse.json()) as CloudinaryRes;
          const uploded = await saveBannerToDb({
            public_id: cloudinaryResData.public_id,
            signature: cloudinaryResData.signature,
            secure_url: cloudinaryResData.secure_url,
            version: cloudinaryResData.version,
            session: session!
          })
          if(!uploded) {
            toast.error("An error occured while Uploading your Banner Image");
          }
          toast.success("Banner image uploaded successfully");
          setUploadedImgUrl(cloudinaryResData.secure_url);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occured while creating your Digital Art");
      } 
    }
    handleBannerUpload();

  }, [uploadedImg])

  return (
    <>
      <div className="absolute inset-0">
        <Image 
          alt="Banner Image"
          src={uploadedImgUrl || "/images/bacBan.jpg"}
          fill
          quality={100}
          style={{objectFit: "cover"}}
        />
        <div {...getRootProps({
          className: "absolute inset-0",
        })}>
          <input {...getInputProps()} />
          <div className="group absolute inset-0 z-[5] transition-all cursor-pointer ease-in-out duration-200 hover:bg-whiteAlpha0">
            <div className="h-full hidden justify-center items-center z-[6] pt-4 cursor-pointer group-hover:flex">
              <MdOutlineModeEdit size={25} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountBannerProfile