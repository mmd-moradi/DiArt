import type { Metadata } from "next";
import {
  METADATA_DESCRIPTION,
  METADATA_KEYWORDS,
  WEBSITE_NAME,
} from "@/constants/Metadata_Setup";
import "./global.css";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Authprovider from "@/components/Auth/Authprovider";
import { getServerSession } from "next-auth";
import { authOptions } from "../config/auth-options";
import { StorageProvider } from "@/state/storageContext/StorageContext";
import { AuthFormProvider } from "@/state/authpopupContext/AuthPopupContext";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: WEBSITE_NAME,
  description: METADATA_DESCRIPTION,
  keywords: METADATA_KEYWORDS,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <Authprovider>
      <AuthFormProvider>
        <StorageProvider>
          <html lang="en" suppressHydrationWarning>
            <body
              className={cn(
                "min-h-screen text-white overflow-x-hidden antialiased bg-primary font-body",
                poppins.variable,
              )}
            >
              <Toaster />
              {children}
            </body>
          </html>
        </StorageProvider>
      </AuthFormProvider>
    </Authprovider>
  );
}
