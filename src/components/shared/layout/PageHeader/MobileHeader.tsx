"use client"
import { MdOutlineShoppingCart } from "react-icons/md";
import AuthForm from "../AuthForm/AuthForm";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { Session } from "next-auth";
import HamMenu from "../HamMenu/HamMenu";
import { useContext, useEffect, useState } from "react";
import { AuthFormContext } from "@/state/authpopupContext/AuthPopupContext";
import CartButton from "../../CartButton/CartButton";
import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { getUserData } from "@/app/api/_actions";
type Props = {
  title: string;
  session: Session | null;
}

const MobileHeader = ({title, session}: Props) => {
  const {state: showForm, dispatch: setShowForm} = useContext(AuthFormContext);
  const [hasScrolled, setHasScrolled] = useState(false);
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
    const getUseProfile = async() => {
      const userData = await getUserData(session);
      if(userData && userData.profileImage){
        setImgUrl(userData?.profileImage)
      }
    }
    if(session){
      getUseProfile();
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled, session])

  return (
    <>
      {showForm && (
        <AuthForm show={showForm} setShowForm={setShowForm} />
      )}
      <header className={`p-4 sticky top-0 w-full bg-primary z-[90] ${headerStyle}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <button onClick={() => router.back()} className="flex items-center text-white p-3.5 rounded-full bg-gradient-primary-1 cursor-pointer font-bold transition-all duration-200 ease-in-out hover:bg-gradient-primary-3">
              <FaArrowLeft color="white" size={14} />
            </button>
            <span className="text-white text-xl font-semibold">{title}</span>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <Link href="/account" passHref>
                <div className="flex items-center space-x-2 rounded-lg bg-gradient-primary-1 px-3 py-2 outline-none border-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-primary-3">
                  <div
                    style={{ position: "relative", width: "22px", height: "22px", overflow: "hidden", borderRadius: "999px" }}>
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
              <button className="flex items-center space-x-2 rounded-lg bg-primaryGradient1 px-3 py-2 outline-none border-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-primaryGradient3" type="button" onClick={() => setShowForm(showForm ? {type: "AuthFormClosed"}: {type: "AuthFormOpened"})}>
                <CgProfile size={22} color="white" />
              </button>
            )}
            <CartButton />
            <HamMenu 
              session={session}
              setShowForm={setShowForm}
              showForm={showForm}
            />
          </div>
        </div>
      </header>
    </>
  )
}

export default MobileHeader;