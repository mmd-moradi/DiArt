import type { Metadata } from "next"
import { METADATA_DESCRIPTION, METADATA_KEYWORDS, WEBSITE_NAME } from "@/constants/Metadata_Setup"
import Header from "@/components/shared/layout/Header/Header"
import Footer from "@/components/shared/layout/Footer/Footer"
import "../global.css"
import { Poppins } from "next/font/google"
import { Toaster } from "react-hot-toast"
import { SessionProvider } from "next-auth/react"
import Authprovider from "@/components/Auth/Authprovider"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { getUserData } from "../api/_actions"
import { StorageProvider } from "@/state/storageContext/StorageContext"
import { AuthFormProvider } from "@/state/authpopupContext/AuthPopupContext"

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: WEBSITE_NAME,
  description: METADATA_DESCRIPTION,
  keywords: METADATA_KEYWORDS,
}

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  return (
    <Authprovider>
      <AuthFormProvider>
        <StorageProvider>
          <html lang="en" className={poppins.className}>
            <body>
              <Toaster />
              <Header session={session}  />
                {children}
              <Footer />
            </body>
          </html>
        </StorageProvider>
      </AuthFormProvider>
    </Authprovider>
  )
}
