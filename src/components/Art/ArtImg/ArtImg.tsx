import { FaDollarSign } from "react-icons/fa6";
import { BiLinkExternal } from "react-icons/bi";
import styles from "./ArtImg.module.css"
import Link from "next/link";
import Image from "next/image";

type Props = {
  dArtName: string;
  imgUrl: string;
}

const ArtImg = ({imgUrl, dArtName}: Props) => {
  return (
    <div className="flex flex-col items-start justify-center rounded-lg w-full h-full border border-whiteAlpha1 shadow-sm bg-gradient-primary-1 overflow-hidden">
      <div className="w-full flex items-center justify-between p-3 border-b border-whiteAlpha1">
        <FaDollarSign size={20} />
        <Link
          href={imgUrl}
          className="text-lg font-semibold text-info4 hover:text-info6"
          style={{ textDecoration: "none" }}
        >
          <BiLinkExternal />
        </Link>
      </div>
      <div className="relative w-full h-[500px] overflow-hidden md:h-[600px]">
        <Image 
          src={imgUrl}
          alt={dArtName}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  )
}

export default ArtImg