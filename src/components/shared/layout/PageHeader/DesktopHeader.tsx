"use client"
import { Session } from "next-auth";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "next-auth/react";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { MdOutlineShoppingCart, MdOutlineWallet } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import AuthForm from "../AuthForm/AuthForm";
import { getUserData } from "@/app/api/_actions";
import { userDataContext } from "@/state/context/userProfileContext";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import CartButton from "../../CartButton/CartButton";
import { AuthFormContext } from "@/state/authpopupContext/AuthPopupContext";

type Props = {
  title: string;
  session: Session | null;
}

const DesktopHeader = ({session, title}: Props) => {
  const {state: showForm, dispatch: setShowForm} = useContext(AuthFormContext);
  const [hasScrolled, setHasScrolled] = useState(false);
  const {state, dispatch} = useContext(userDataContext)
  const [imgUrl, setImgUrl] = useState<string>()
  const router = useRouter();
  const headerStyle = hasScrolled ? "border-b-2 border-b-whiteAlpha2":"";
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  }

  useEffect(() => { 
    if (state.data?.userProfileUrl) {
      setImgUrl(state.data.userProfileUrl)
    }else {
      const getUseProfile = async() => {
        const userData = await getUserData(session);
        if(userData && userData.profileImage){
          setImgUrl(userData.profileImage)
        }
      }
      if(session) {
        getUseProfile();
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled, session,state.data?.userProfileUrl])


  return (
    <>
      {showForm && (
        <AuthForm show={showForm} setShowForm={setShowForm} />
      )}
      <header className={`px-8 py-4 sticky top-0 w-full bg-primary z-[90] md:px-16 ${headerStyle}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <button onClick={() => router.push("/")} className="flex items-center text-white p-3.5 rounded-full bg-gradient-primary-1 cursor-pointer font-bold transition-all duration-200 ease-in-out hover:bg-gradient-primary-3">
              <FaArrowLeft  />
            </button>
            <span className="text-white text-xl font-semibold">{title}</span>
          </div>
          <div className="flex items-center space-x-4">
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