import Hero from "@/components/home/Hero/Hero"
import Marketplace from "@/components/home/MarketPlace/Marketplace"
import { getFeaturedDArts } from "../api/_actions"
import DigitalArts from "@/components/home/Nfts/DigitalArts";

export default async function Home() {
  const featuredArts = await getFeaturedDArts();
  return (
    <main className="w-full mt-8">
      <Hero />
      <DigitalArts featuredArts={featuredArts} />
      <Marketplace />
    </main>
  )
}
