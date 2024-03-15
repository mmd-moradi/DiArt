import Hero from "@/components/home/Hero/Hero"
import Marketplace from "@/components/home/MarketPlace/Marketplace"
import DigitalArts from "@/components/home/Nfts/DigitalArts";

export default function Home() {
  return (
    <main className="w-full mt-8">
      <Hero />
      <DigitalArts />
      <Marketplace />
    </main>
  )
}


