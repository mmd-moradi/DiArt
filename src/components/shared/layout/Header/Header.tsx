"use client"
import Image from "next/image";
import styles from './Header.module.css';
import Link from "next/link";
import { MdOutlineWallet } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useContext, useEffect, useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import { signOut, useSession } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { userDataContext } from "@/state/context/userProfileContext";
import { getUserData } from "@/app/api/_actions";
import { AuthFormContext } from "@/state/authpopupContext/AuthPopupContext";
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