import Link from "next/link";
import FeaturedArts from "./FeaturedArts";
import { DArtDataType } from "@/app/api/_actions";

type Props = {
  featuredArts: DArtDataType[];
}
const DigitalArts = ({featuredArts}: Props) => {
  return (
    <section className="mt-24 w-full px-8 pb-8 bg-black bg-opacity-10 md:px-16">
      <div className="flex flex-col justify-start space-y-12 py-20 px-1">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl font-semibold tracking-tighter md:text-4xl md:leading-tight">
            Popular Digital Arts
          </h1>
          <Link href="/arts" className="text-secondary text-base font-semibold leading-tight tracking-tighter hover:text-white md:text-lg">
            View all
          </Link>
        </div>
        <div className="flex px-1 py-2 items-center space-x-7">
          <FeaturedArts featuredArts={featuredArts} />
        </div>
      </div>
    </section>
  )
}

export default DigitalArts






