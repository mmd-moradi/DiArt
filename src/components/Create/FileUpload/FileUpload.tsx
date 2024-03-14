"use client"
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { UseFormRegister, UseFormReturn, UseFormSetFocus, useFormContext } from "react-hook-form";
import { FormInputs } from "@/app/(create)/create/page";

type Props = {
  onChangeFun: (e: any) => void;
  methods: UseFormReturn<FormInputs>;
}

const FileUpload = ({onChangeFun, methods}: Props) => {
  const [uploadedFile, setUploadedFile] = useState<any>();
  const [fileError, setFileError] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const onDrop = useCallback((acceptedFile: any, rejectedFile: any) => {
    setFileError(undefined);
    if(acceptedFile?.length) {
      const file = acceptedFile[0];
      setUploadedFile(Object.assign(file, {preview: URL.createObjectURL(file)}))
      methods.setValue("file", file, { shouldValidate: true});
    }
    if(rejectedFile?.length) {
      setFileError("The file is not supported or more than 15MB")
      toast.error(fileError!);
    }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {
    "image/*": []
  },
  maxSize: 1024 * 1024 * 15
})
  const removeFile = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadedFile(undefined);
  }


  return (
    <>
      <div {...getRootProps({
        className: "group flex items-center justify-start w-full border border-gray-600 p-8 rounded-lg transition-all duration-200 ease-in-out cursor-pointer hover:border-gray-500",
        style: {border: methods.formState.errors.file && ("1px solid #FF035E")}
      })}>
      <input {...getInputProps({onChange: onChangeFun })} />
        {uploadedFile && methods.getValues("file") ? (
            <div className="flex items-center gap-8 w-full">
              <div className="flex items-center justify-start gap-8 w-full h-full">
                <Image 
                  alt="uploded File"
                  src={uploadedFile.preview}
                  className="object-cover rounded-lg"
                  width={130}
                  height={100}
                  onLoad={() => URL.revokeObjectURL(uploadedFile.preview)}
                  style={{objectFit: "cover", borderRadius: "8px"}}
                />
                <span className="leading-6 text-base font-semibold text-white">{uploadedFile.name}</span>
              </div>
              <div className="hidden cursor-pointer transition-all duration-100 ease-in-out hover:opacity-80 md:group-hover:flex">
                <FaRegTrashAlt size={20} onClick={(e) => removeFile(e)} />
              </div>
            </div>
        ): (
          <div className="flex flex-col items-center gap-8 w-full  md:flex-row">
            <div className="flex items-center border border-gray-600 p-9 rounded-lg transition-all duration-200 ease-in-out group-hover:border-gray-500">
              <MdOutlinePhotoSizeSelectActual size={18} />
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <p className="leading-6 font-semibold text-lg">Drag and drop or click to upload</p>
              <span className="leading-5 text-base text-secondary">You may change this after deploying your contract.</span>
              <span className="leading-5 text-base text-secondary">Recommended size: 350 x 350. File types: JPG, PNG, SVG, or GIF</span>
            </div>
          </div>
        )}
      </div>

    </>
  )
}

export default FileUpload