
import Authprovider from "@/components/Auth/Authprovider";
import { Poppins } from "next/font/google";
import "../../global.css"
import { Toaster } from "react-hot-toast";
import PageHeader from "@/components/shared/layout/PageHeader/PageHeader";
import { getUserData } from "@/app/api/_actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { UserProfileProvider, userDataContext } from "@/state/context/userProfileContext";
import { StorageProvider } from "@/state/storageContext/StorageContext";
import { AuthFormProvider } from "@/state/authpopupContext/AuthPopupContext";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-body",
})
export default async function Createlayout ({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/")
  }
  return (
    <Authprovider>
      <AuthFormProvider>
        <StorageProvider>
          <UserProfileProvider>
            <html lang="en" suppressHydrationWarning>
              <body className={cn("min-h-screen text-white overflow-x-hidden antialiased bg-primary font-body",poppins.variable)}>
              <Toaster />
                <PageHeader title="Account" session={session}/>
                  {children}
              </body>
            </html>
          </UserProfileProvider>
        </StorageProvider>
      </AuthFormProvider>
    </Authprovider>
  )
}

