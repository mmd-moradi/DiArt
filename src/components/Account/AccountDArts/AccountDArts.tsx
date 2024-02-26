"use client"
import Image from "next/image"
import styles from "./AccountDArts.module.css"
import { FaDollarSign } from "react-icons/fa6";
import { DArt } from "@/models/DArt"
import Link from "next/link";
import { useRouter } from "next/navigation";


type Props = {
  dArt: DArt
}
const AccountDArts = ({dArt}: Props) => {
  const router = useRouter();
  return (
      <div onClick={() => router.push(`/arts/${dArt.uuid}`)} className="flex flex-col items-center justify-start min-w-[165px] w-[48%] h-[300px] rounded-lg overflow-hidden bg-gradient-primary-0 transition-all duration-200 ease-in-out cursor-pointer hover:bg-gradient-primary-2 hover:-translate-y-1 md:h-[350px] md:w-[31%]">
        <div className="relative w-full h-[200px] md:h-[250px]">
          <Image 
            src={dArt.imageUrl}
            alt={dArt.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full px-4 py-4 gap-2">
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-semibold leading-5 text-white md:text-xl">{dArt.name}</span>
            <div className="flex items-center gap-0.5">
              <FaDollarSign className="text-base text-white md:text-lg" />
              <span className="text-lg font-semibold leading-5 text-white md:text-xl">{dArt.price}</span>
            </div>
          </div>
          <span className="text-base font-normal leading-5 text-white mb-2">
            {dArt.description.slice(0, 30)}...
          </span>
        </div>
      </div>
  )
}

export default AccountDArts