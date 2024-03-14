"use client"
import { redirect, useRouter } from "next/navigation"

const EmptyDiArt = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full rounded-[10px] h-64 mt-6 border border-whiteAlpha9">
      <span className="text-[28px] font-medium text-white">No created Digital Art</span>
      <button 
        onClick={() => router.push("/create")}
        className="mt-6 max-w-[200px] bg-gradient-primary py-3 px-6 rounded-[10px] text-base font-semibold border-none text-white cursor-pointer transition-all duration-200 ease-in hover:bg-gradient-primary-hover"
      >
        Create Digital Art
      </button>
  </div>
  )
}

export default EmptyDiArt