"use client"
import { DArtDataType } from "@/app/api/_actions";
import React from "react"
import Image from "next/image"
import { FaDollarSign } from "react-icons/fa6";
import { MediaQuery } from "@/utils/getMedia";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useRouter } from "next/navigation";
type Props = {
  featuredArts: DArtDataType[];

}
const FeaturedArts = ({featuredArts}: Props) => {
  const router = useRouter();
  return (
    <>
      {MediaQuery(768) ? (
          <Carousel className="w-full px-4">
            <CarouselContent>
              {featuredArts.map((art, index) => (
                <CarouselItem key={index}>
                  <div className="w-full flex items-center">
                    <div 
                      key={index}
                      className="w-full flex flex-col space-y-5 bg-gradient-primary-0 rounded-lg transition-all duration-300 ease-in-out cursor-pointer  hover:bg-gradient-primary-3"
                      onClick={() => router.push(`/arts/${art.uuid}`)}
                    >
                      <div className="relative w-full h-72 overflow-hidden rounded-t-lg">
                        <Image 
                          src={art.imageUrl}
                          alt="Digital Art"
                          quality={100}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="flex items-center justify-between px-2 pb-3 border-b border-white border-opacity-10">
                        <p className="text-white text-lg font-semibold leading-tight tracking-tighter">
                          {art.name}
                        </p>
                        <div className="flex items-center space-x-1">
                          <FaDollarSign />
                          <p className="text-white text-center text-lg font-semibold leading-tight tracking-tighter">{art.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-2 pb-4">
                        <p className="text-secondary text-base font-medium leading-tight tracking-tighter">
                          24h volume
                        </p>
                        <button onClick={() => router.push(`/arts/${art.uuid}`)} className="text-[12px] font-medium text-primary text-center rounded-md px-[20px] py-1 border border-gray-300 bg-white cursor-pointer hover:bg-secondary">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-4" />
            <CarouselNext className="mr-4" />
          </Carousel>
        ): (
          featuredArts.map((art, index) => (
            <div 
              key={index}
              className="w-full flex flex-col space-y-5 bg-gradient-primary-0 rounded-lg transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:bg-gradient-primary-3"
              onClick={() => router.push(`/arts/${art.uuid}`)}
            >
              <div className="relative w-full h-72 overflow-hidden rounded-t-lg">
                <Image 
                  src={art.imageUrl}
                  alt="Digital Art"
                  quality={100}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex items-center justify-between px-2 pb-3 border-b border-white border-opacity-10">
                <p className="text-white text-lg font-semibold leading-tight tracking-tighter">
                  {art.name}
                </p>
                <div className="flex items-center space-x-1">
                  <FaDollarSign />
                  <p className="text-white text-center text-lg font-semibold leading-tight tracking-tighter">{art.price}</p>
                </div>
              </div>
              <div className="flex items-center justify-between px-2 pb-4">
                <p className="text-secondary text-base font-medium leading-tight tracking-tighter">
                  24h volume
                </p>
                <button onClick={() => router.push(`/arts/${art.uuid}`)} className="text-[12px] font-medium text-primary text-center rounded-md px-[20px] py-1 border border-gray-300 bg-white cursor-pointer hover:bg-secondary">
                  View
                </button>
              </div>
            </div>
          ))
        )}
    </>
  )
}

export default FeaturedArts