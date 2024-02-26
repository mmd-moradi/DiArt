import Hero from "@/components/home/Hero/Hero"
import styles from "./Home.module.css"
import Marketplace from "@/components/home/MarketPlace/Marketplace"
import { getFeaturedDArts } from "../api/_actions"
import DigitalArts from "@/components/home/Nfts/DigitalArts";

export default async function Home() {
  const featuredArts = await getFeaturedDArts();
  return (
    <main className={styles.HomePageContainer}>
      <Hero />
      <DigitalArts featuredArts={featuredArts} />
      <Marketplace />
    </main>
  )
}
