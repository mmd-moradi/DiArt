"use client"
import { Session } from "next-auth";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import { useEffect, useState } from "react";
type Props = {
  title: string;
  session: Session | null;
}

const PageHeader = ({title, session}: Props) => {
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

  return (
    <>
      {isMobile ? (
        <MobileHeader session={session} title={title} />
      ): (
        <DesktopHeader session={session} title={title} />
      )}
    </>
  )
}

export default PageHeader;