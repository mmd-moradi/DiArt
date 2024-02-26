"use client"
import { redirect, useRouter } from "next/navigation"
import styles from "./EmptyArt.module.css"

const EmptyDiArt = () => {
  const router = useRouter()
  return (
    <div className={styles.AccountArtsEmptyCon}>
      <span className={styles.AccountArtsEmptyTitle}>No created Digital Art</span>
      <button onClick={() => router.push("/create")} className={styles.AccountArtsEmptyButton}>Create Digital Art</button>
  </div>
  )
}

export default EmptyDiArt