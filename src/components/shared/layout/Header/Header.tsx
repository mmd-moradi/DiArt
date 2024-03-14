"use client"

import { useContext, useEffect, useState } from "react";
import { Session } from "next-auth";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

type Props = {
  session: Session | null;

}

const Header = ({session}: Props) => {
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
        <MobileHeader session={session} />
      ): (
        <DesktopHeader session={session}  />
      )}
    </>
  )
}

export default Header;