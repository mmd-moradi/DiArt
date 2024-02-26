"use client"
import FileUpload from "@/components/Create/FileUpload/FileUpload";
import styles from "./Create.module.css";
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getsigniture, saveToDatabase } from "@/app/api/_actions";
import { FileWithPath } from "react-dropzone";
import { getSession } from "next-auth/react";
import { useState } from "react";


export type FormInputs = {
  file: FileWithPath,
  dArtName: string,
  nCopies: string,
  pricePerCopy: string,
  description: string,
}

export interface CloudinaryRes {
  public_id: string;
  version: string;
  signature: string;
  secure_url: string;
}


const ErrComponent = ({ message }: { message: string }) => (
  <p className="text-danger text-sm font-semibold mt-1">{message}</p>
)

const Create = () => {
  const methods = useForm<FormInputs>();
  const [submitted, setSubmitted] = useState(false);
  const onSubmit: SubmitHandler<FormInputs> = async(data) => {
    try {
      if(!data.file) {
        toast.error("Please upload a file");
        return;
      }
      const {signature, timestamp} = await getsigniture();
      const formData = new FormData()
      formData.append("file", data.file);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());
      formData.append("folder", "diArt");      
      const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL!;
      const cloudinaryResponse = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });
      const cloudinaryResData = (await cloudinaryResponse.json()) as CloudinaryRes;
      const session = await getSession();
      if(!session) {
        toast.error("You must be logged in to create a Digital Art");
        return;
      }
      const isVerified = await saveToDatabase({
        public_id: cloudinaryResData.public_id,
        signature: cloudinaryResData.signature,
        version: cloudinaryResData.version,
        secure_url: cloudinaryResData.secure_url,
        dArtName: data.dArtName,
        nCopies: data.nCopies,
        pricePerCopy: data.pricePerCopy,
        description: data.description,
        session

      });
      if(!isVerified) {
        toast.error("An error occured while creating your Digital Art");
      }
      toast.success("Digital Art created successfully");
      methods.reset();
    }catch(err) {
      console.log(err);
      toast.error("An error occured while creating your Digital Art");
    }
  };
  console.log(methods.formState.errors);
  return (
    <main className="px-8 w-full mt-8 md:px-16">
      <div className="flex flex-col items-start md:items-center">
        <div className="flex flex-col items-start justify-center">
          <h2 className="leading-10 mb-3 font-semibold text-2xl text-white md:text-3xl">
            First, you&apos;ll need to deploy your <br className="hidden md:block" />Digital Art
          </h2>
          <p className="leading-6 text-base text-white md:text-lg">You&apos;ll need to deploy an contract onto our website before you can earn.</p>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-8 flex flex-col items-start justify-center">
            <Controller 
              control={methods.control}
              name="file"
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              render={({ field: { onChange, onBlur }, fieldState }) => (
                <div className="w-full flex flex-col gap-3 mb-8">
                  <label className="leading-6 font-semibold text-lg">
                    Logo image
                  </label>
                  <FileUpload methods={methods} onChangeFun={onChange} />
                  {methods.formState.errors.file &&
                  <ErrComponent message={methods.formState.errors.file.message!} />
                  }
                </div>
              )}
            />
            <div className="flex flex-col gap-3 mb-8">
              <label className="leading-6 font-semibold text-lg">
                Digital Art name
              </label>
              <input
                {...methods.register("dArtName", {required: {value: true, message: "Please Provide a name for your Digital Art"},
                maxLength: {value: 50, message: "Digital Art name cannot be longer than 50 characters"},})}
                className={`outline-none border border-whiteAlpha5 text-white bg-transparent rounded-lg text-base p-2 
                w-72 h-12 focus:border-whiteAlpha7 ${methods.formState.errors.dArtName && "border border-danger"}`}
                type="text"
                placeholder="My art name"
                maxLength={50}
              />
              {methods.formState.errors.dArtName && 
                <ErrComponent message={methods.formState.errors.dArtName.message!} />
              }
            </div>
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex flex-col gap-3 md:mb-8">
                <label className="leading-6 font-semibold text-lg">
                  Number of copies
                </label>
                <input
                  {...methods.register("nCopies", (
                    {required: {value: true, message: "Please provide the number of copies"},
                    min: {value: 1, message: "You must create at least 1 copy"},
                    max: {value: 1000, message: "You cannot create more than 1000 copies"},
                    pattern: {value: /^[0-9]*$/, message: "You can only enter numbers"}
                  }))}
                  className={`outline-none border border-whiteAlpha5 text-white bg-transparent rounded-lg text-base p-2 w-72 
                  h-12 focus:border-whiteAlpha7 ${methods.formState.errors.dArtName && "border border-danger"}`}
                  placeholder="5"
                />
                {methods.formState.errors.nCopies &&
                  <ErrComponent message={methods.formState.errors.nCopies.message!} />
                }
              </div>
              <div className="flex flex-col gap-3 mb-8">
                <label className="leading-6 font-semibold text-lg">
                  Price per copy
                </label>
                <input
                  {...methods.register("pricePerCopy", {
                    required: {value: true, message: "Please provide a price for your Digital Art"},
                    min: {value: 1, message: "Price must be at least $1"},
                    max: {value: 1000000,message: "Price cannot be more than $1,000,000"},
                    pattern: {value: /^[0-9]*$/, message: "You can only enter numbers"}
                  })} 
                  className={`outline-none border border-whiteAlpha5 text-white bg-transparent rounded-lg text-base p-2 w-72 
                  h-12 focus:border-whiteAlpha7 ${methods.formState.errors.dArtName && "border border-danger"}`}
                  placeholder="$10"
                />
                {methods.formState.errors.pricePerCopy &&
                  <ErrComponent message={methods.formState.errors.pricePerCopy.message!} />
                }
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-8">
              <label className="leading-6 font-semibold text-lg">
                Description
              </label>
              <textarea
                {...methods.register("description", (
                  {required: {value: true, message: "Please provide description for your Digital Art"},
                  maxLength: {value: 1000, message: "Description cannot be longer than 1000 characters"},}))}
                className={`outline-none border border-whiteAlpha5 text-white bg-transparent rounded-lg text-sm p-2 w-full md:w-96
                 h-32 focus:border-whiteAlpha7 ${methods.formState.errors.dArtName && "border border-danger"}`}
                placeholder="Description"
              />
              {methods.formState.errors.description &&
                <ErrComponent message={methods.formState.errors.description.message!} />
              }
            </div>
            <button className="text-center outline-none border-none rounded-lg py-3 px-6 text-lg font-semibold text-white bg-gradient-primary cursor-pointer mb-8 hover:bg-gradient-primary-hover" type="submit">Create Digital Art</button>
          </form>
        </FormProvider>
      </div>
    </main>
  )
}

export default Create;