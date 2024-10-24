import Header from "@/components/shared/layout/Header/Header";
import Footer from "@/components/shared/layout/Footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Header session={session} />
      {children}
      <Footer />
    </>
  );
}
