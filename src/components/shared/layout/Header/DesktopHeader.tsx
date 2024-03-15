"use client"
import { getUserData } from "@/app/api/_actions";
import { AuthFormContext } from "@/state/authpopupContext/AuthPopupContext";
import { userDataContext } from "@/state/context/userProfileContext";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import Link from "next/link";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineShoppingCart, MdOutlineWallet } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { getSession, signOut } from "next-auth/react";
import CartButton from "../../CartButton/CartButton";

type Props = {
  session: Session | null;

}

const DesktopHeader = ({session}: Props) => {
  const {state: showForm, dispatch: setShowForm} = useContext(AuthFormContext)
  const router = useRouter();
  const {state, dispatch} = useContext(userDataContext)
  const [imgUrl, setImgUrl] = useState<string>()
  useEffect(() => {
    const getUseProfile = async() => {
      const userData = await getUserData(session);
      if(userData && userData.profileImage){
        setImgUrl(userData?.profileImage)
      }
    }
    if(session){
      getUseProfile();
    }
  },[session])


  return (
    <>
      {showForm && (
        <AuthForm show={showForm} setShowForm={setShowForm} />
      )}
      <header className="px-8 py-2 sticky top-0 left-0 w-full bg-primary z-[95] md:px-16">
        <div className="flex items-center justify-between">
          <Link href="/" passHref>
            <div className="flex items-center justify-center cursor-pointer">
              <Image
                src="/images/diart-logo.png"
                alt="diart logo"
                width={141}
                height={100}
                style={{ objectFit: "contain" }}
              />
            </div>
          </Link>
          <nav className="flex items-center justify-center gap-8">
            <Link 
              href="/arts" 
              style={{ textDecoration: "none" }}
              passHref
            >
              <span className="text-white text-lg font-semibold w-full transition-all duration-200 ease-in-out hover:text-secondary">
                Arts
              </span>
            </Link>
            <Link 
              href="/marketplace"
              style={{ textDecoration: "none" }}
              passHref
            >
              <span className="text-white text-lg font-semibold w-full transition-all duration-200 ease-in-out hover:text-secondary">
                Marketplace
              </span>
            </Link>
            <Link 
              href="/create" 
              style={{ textDecoration: "none" }}
              passHref
            >
              <span className="text-white text-lg font-semibold w-full transition-all duration-200 ease-in-out hover:text-secondary">
                Create
              </span>
            </Link>
            <Link 
              href="/activity"
              style={{ textDecoration: "none" }} 
              passHref
            >
              <span className="text-white text-lg font-semibold w-full transition-all duration-200 ease-in-out hover:text-secondary">
                Activity
              </span>
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            {session ? (
              <button className="flex items-center gap-2 rounded-lg bg-gradient-primary-1 px-3 py-2 outline-none border-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-primary-3" type="button" onClick={() => signOut()}>
                <IoIosLogOut size={28} color="white" />
                <p className="text-white text-base font-semibold">Logout</p>
              </button>
            ) : (
              <button className="flex items-center gap-2 rounded-lg bg-gradient-primary-1 px-3 py-2 outline-none border-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-primary-3" type="button" onClick={() => setShowForm(showForm ? {type: "AuthFormClosed"}: {type: "AuthFormOpened"})}>
                <MdOutlineWallet size={28} color="white" />
                <p className="text-white text-base font-semibold">Login</p>
              </button>
            )}
            <CartButton />
            {session ? (
              <Link href="/account" passHref>
                <div className="flex items-center gap-2 rounded-lg bg-gradient-primary-1 px-3 py-2 outline-none border-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-primary-3">
                  <div
                    style={{ position: "relative", width: "28px", height: "28px", overflow: "hidden", borderRadius: "999px" }}>
                      <Image
                        src={ imgUrl || "/images/userBacImg.png"}
                        alt="user profile"
                        fill
                        style={{ objectFit: "cover", borderRadius: "9999px" }}
                      />
                  </div>
                </div>
              </Link>
            ) : (
              <button className="flex items-center gap-2 rounded-lg bg-gradient-primary-1 px-3 py-2 outline-none border-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-primary-3" type="button" onClick={() => setShowForm(showForm ? {type: "AuthFormClosed"}: {type: "AuthFormOpened"})}>
                <CgProfile size={28} color="white" />
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
export default DesktopHeader