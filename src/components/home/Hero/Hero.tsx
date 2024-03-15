"use client"
import Image from "next/image"
import { FaDollarSign } from "react-icons/fa6";
import { useRouter } from "next/navigation";
const Hero = () => {
  const router = useRouter();
  return (
    <section className="px-8 md:px-16">
      <div className="flex flex-col gap-16 py-4 w-full md:flex-row md:gap-0">
        <div className="w-full flex flex-col items-start gap-[38px] md:pt-8 md:flex-1">
          <h1 className="text-white text-4xl font-bold leading-snug tracking-tighter md:text-5xl md:leading-snug">Discover, collect,<br />and sell extraordinary<br />Digital Arts</h1>
          <p className="text-secondary text-lg font-normal tracking-wider">
            Welcome to our website , where we provide comprehensive information on Digital Arts and their impact on the digital world .
          </p>
          <div className="flex items-center mt-6 gap-8">
            <button
              onClick={() => router.push("/marketplace")}
              className="bg-gradient-primary text-center outline-none rounded-lg px-10 py-4 font-semibold text-white text-lg border-none cursor-pointer hover:bg-gradient-primary-hover hover:text-secondary md:px-14">
                Explore
              </button>
            <button
              onClick={() => router.push("/create")}
              className="bg-transparent outline-none text-center rounded-lg px-10 py-[15px] font-semibold text-white text-lg border border-secondary cursor-pointer hover:bg-whiteAlpha1 md:px-14">Create</button>
          </div>
        </div>
        <div className="flex flex-col items-end md:flex-1">
          <div className="w-full rounded-3xl border border-blue-500 bg-gradient-primary-2 flex flex-col gap-4 px-8 py-6 md:max-w-[500px]">
            <div className="relative w-full overflow-hidden rounded-2xl h-[400px] md:h-[450px]">
              <Image
                src="/images/heroImg2.jpg"
                alt="nft"
                quality={100}
                fill
                style={{ objectFit:  "cover" }} />
            </div>
            <div className="mt-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-white text-base font-semibold tracking-wide">MRD collection</p>
                <p className="text-white text-base font-semibold tracking-wide">Top bid</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-secondary text-base font-medium tracking-wide">MRD #10123334</p>
                <div className="flex items-center">
                  <FaDollarSign size={16} style={{ color: "var(--secondary)"}}/>
                  <p className="text-secondary text-base font-medium tracking-wide">3,222</p>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <p className="text-secondary text-base font-medium tracking-wide">7 days left</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
