"use client";
import { Session } from "next-auth";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
type Props = {
  session: Session | null;
};

const PageHeader = ({ session }: Props) => {
  const pathname = usePathname();
  const titleMap: Record<string, string> = {
    create: "Create",
    account: "Account",
    arts: "Digital Art",
  };
  const title = titleMap[pathname.split("/")[1]];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (!session && !pathname.startsWith("/arts")) {
    redirect("/");
  }
  return (
    <>
      {isMobile ? (
        <MobileHeader session={session} title={title} />
      ) : (
        <DesktopHeader session={session} title={title} />
      )}
    </>
  );
};

export default PageHeader;
