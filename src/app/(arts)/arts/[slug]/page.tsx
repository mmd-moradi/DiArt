
import ArtImg from "@/components/Art/ArtImg/ArtImg"
import styles from "./Art.module.css"
import ArtInfo from "@/components/Art/ArtInfo/ArtInfo"
import { getDArtsDataByUUID } from "@/app/api/_actions"
import { notFound } from "next/navigation"

type Props = {
  params: {
    slug: string
  }

}
export default async function DArtPage({ params }: Props) {
  const dArtData = await getDArtsDataByUUID(params.slug)
  if(!dArtData) {
    notFound()
  }
  return (
    <div className="mt-8 mb-32 px-8 w-full flex flex-col items-start justify-start gap-8 md:flex-row md:items-center md:justify-start md:px-16 md:gap-0">
      <div className="flex flex-col items-start justify-center w-full md:w-4/5">
        <ArtImg imgUrl={dArtData.imageUrl} dArtName={dArtData.name} />
      </div>
      <div className="flex flex-col items-start justify-start w-full md:ml-6">
        <ArtInfo 
          createdAt={dArtData.createdAt}
          dArtName={dArtData.name}
          description={dArtData.description}
          ownerName={dArtData.ownerUsername}
          price={dArtData.price}
          nDarts={dArtData.nCopies}
          imgUrl={dArtData.imageUrl}
          uuid={dArtData.uuid}
          price_id={dArtData.price_id}
        />
      </div>
    </div>
  )
}