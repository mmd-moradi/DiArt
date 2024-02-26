"use client"
import Image from "next/image";
import styles from "./Marketplace.module.css";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Marketplace = () => {
  const router = useRouter();
  return (
    <section className="mt-5 px-8 pt-6 pb-20 w-full md:px-16">
      <div className="w-full flex flex-col gap-16 items-center md:flex-row md:justify-between md:gap-4">
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="relative w-[180px] h-[210px] overflow-hidden md:w-[250px] md:h-[280px]">
              <Image 
                src="/images/arts/Art_1.png"
                alt="DigitalArt"
                quality={100}
                fill
                style={ {objectFit: "contain"} }
              />
            </div>
          </div>
          <div className="flex items-center pt-16">
            <div className="relative w-[180px] h-[210px] overflow-hidden md:w-[250px] md:h-[280px]">
              <Image 
                src="/images/arts/Art_2.png"
                alt="DigitalArt"
                quality={100}
                fill
                style={ {objectFit: "contain"} }
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative w-[180px] h-[210px] overflow-hidden md:w-[250px] md:h-[280px]">
              <Image 
                src="/images/arts/Art_3.png"
                alt="DigitalArt"
                quality={100}
                fill
                style={ {objectFit: "contain"} }
              />
            </div>
          </div>
          <div className="flex items-center pt-16">
            <div className="relative w-[180px] h-[210px] overflow-hidden md:w-[250px] md:h-[280px]">
              <Image 
                src="/images/arts/Art_4.png"
                alt="DigitalArt"
                quality={100}
                fill
                style={ {objectFit: "contain"} }
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6 md:gap-8">
          <h1 className="text-white text-3xl font-medium leading-snug tracking-tighter md:text-4xl">Digital Art Marketplace</h1>
          <p className="text-secondary text-sm font-medium leading-relaxed tracking-wider md:text-base">
            Create your first Art with market for Artis . Create Art just under the $20 , the platform works with AI . With DiArt , you are getting the control over your Arts , no middle man cutting your sales . Create , Buy , Sell and Earn with your Arts .
          </p>
          <button 
            onClick={() => router.push("/marketplace") }
            className="group w-4/5 flex px-4 py-4 justify-center items-center gap-2 bg-gradient-primary rounded-full bg-clip-text text-transparent border border-blue-500 text-base font-semibold cursor-pointer hover:bg-clip-border hover:text-white md:w-3/5">
            Explore Marketplace <FaArrowRight size={16} className="text-blue-500 transition-transform duration-300 group-hover:text-white group-hover:translate-x-2" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Marketplace