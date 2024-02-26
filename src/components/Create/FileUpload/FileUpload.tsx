"use client"
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone";
import styles from "./FileUpload.module.css";
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
        className: styles.FileUploadCon,
        style: {border: methods.formState.errors.file && ("1px solid #FF035E")}
      })}>
      <input {...getInputProps({onChange: onChangeFun })} />
        {uploadedFile && methods.getValues("file") ? (
            <div className={styles.FileUploadConInDiv2}>
              <div className={styles.FileUploadConInImgCon}>
                <Image 
                  alt="uploded File"
                  src={uploadedFile.preview}
                  className={styles.FileUploadConInImg}
                  width={130}
                  height={100}
                  onLoad={() => URL.revokeObjectURL(uploadedFile.preview)}
                  style={{objectFit: "cover", borderRadius: "8px"}}
                />
                <span className={styles.FileUploadConIn}>{uploadedFile.name}</span>
              </div>
              <div className={styles.FileUploadConInImgTrash}>
                <FaRegTrashAlt size={18} onClick={(e) => removeFile(e)} />
              </div>
            </div>
        ): (
          <div className={styles.FileUploadConInDiv}>
            <div className={styles.FileUploadConInIcon}>
              <MdOutlinePhotoSizeSelectActual size={18} />
            </div>
            <div className={styles.FileUploadConInDesc}>
              <p className={styles.FileUploadConInDescP}>Drag and drop or click to upload</p>
              <span className={styles.FileUploadConInDescSpan}>You may change this after deploying your contract.</span>
              <span className={styles.FileUploadConInDescSpan}>Recommended size: 350 x 350. File types: JPG, PNG, SVG, or GIF</span>
            </div>
          </div>
        )}
      </div>

    </>
  )
}

export default FileUpload