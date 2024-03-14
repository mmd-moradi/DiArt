"use client"
import Image from "next/image"
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { Session } from "next-auth";
import { FileRejection, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { getsigniture, saveProfileImgToDb } from "@/app/api/_actions";
import { CloudinaryRes } from "@/app/(create)/create/page";
import { MdOutlineModeEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { User } from "@/models/User";
import { userDataContext } from "@/state/context/userProfileContext";


type Props = {
  session: Session;
  profileImgUrl?: string;
}

const AccountProfile = ({ session, profileImgUrl }: Props) => {
  const {state, dispatch} = useContext(userDataContext)
  const [uploadedImg, setUploadedImg] = useState<File>();
  const [uploadedImgUrl, setUploadedImgUrl] = useState(profileImgUrl);
  const router = useRouter();

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
    const handleProfileUpload = async () => {
      try {
        if (uploadedImg) {
          const formData = new FormData();
          const { signature, timestamp } = await getsigniture("diArt/profile/image");
          formData.append("file", uploadedImg);
          formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
          formData.append("signature", signature);
          formData.append("timestamp", timestamp.toString());
          formData.append("folder", "diArt/profile/image");      
          const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL!;
          const cloudinaryResponse = await fetch(endpoint, {
            method: "POST",
            body: formData,
          });
          const cloudinaryResData = (await cloudinaryResponse.json()) as CloudinaryRes;
          const uploded = await saveProfileImgToDb({
            public_id: cloudinaryResData.public_id,
            signature: cloudinaryResData.signature,
            secure_url: cloudinaryResData.secure_url,
            version: cloudinaryResData.version,
            session: session!
          })
          if(!uploded) {
            toast.error("An error occured while Uploading your Profile Image");
          }
          toast.success("Profile image uploaded successfully");
          setUploadedImgUrl(cloudinaryResData.secure_url);
          dispatch({type: "SET_USER_PROFILE", payload: {userProfileUrl: cloudinaryResData.secure_url}})
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occured while creating your Digital Art");
      } 
    }
    handleProfileUpload();

  }, [uploadedImg])
  return (
    <div className="relative bg-[#121212] overflow-hidden w-full h-full">
      <Image 
        alt="Profile Image"
        src={ uploadedImgUrl || "/images/userBacImg.png"}
        fill
        style={{objectFit: "cover"}}
      />
      <div {...getRootProps({
          className: "absolute inset-0",
        })}>
          <input {...getInputProps()} />
          <div className="group absolute inset-0 z-[6] transition-all duration-200 ease-in-out hover:bg-whiteAlpha0">
            <div className="h-full hidden items-center justify-center z-[7] cursor-pointer group-hover:flex">
              <MdOutlineModeEdit size={25} />
            </div>
          </div>
      </div>
    </div>
  )
}

export default AccountProfile