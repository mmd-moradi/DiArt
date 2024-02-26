import Image from "next/image";
import styles from "./SuccessPage.module.css";
const page = () => {
  return (
    <div className={styles.SuccessContainer}>
      <div className={styles.SuccessMainContainer}>
        <div className={styles.SuccessMainIcon}>
          <Image 
            src="/images/checked.png"
            alt="Success icon"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.SuccessMainTitleContainer}>
          <h1 className={styles.SuccessMainTitle}>Thank you for your purchase</h1>
          <p className={styles.SuccessMainSubTitle}>Your digital art is now available in your collection, check your account.</p>
        </div>
      </div>
    </div>
  )
}

export default page