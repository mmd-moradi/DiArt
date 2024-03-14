"use client"
import { BsExclamationCircle } from "react-icons/bs";
import Image from "next/image";
import { FaDollarSign, FaStripe } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import * as Radio from '@radix-ui/react-radio-group';


// import * as RadioGroup from "@radix-ui/react-radio-group";
import { Dispatch, SetStateAction, use, useContext, useEffect, useState } from "react";
import { DArtCartDataType } from "@/components/Art/ArtInfo/ArtInfo";
import { storageContext } from "@/state/storageContext/StorageContext";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { AuthFormContext } from "@/state/authpopupContext/AuthPopupContext";

type Props =  {
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  cartItems: DArtCartDataType[];
}

const CartMenu = ({setIsCartOpen, cartItems}: Props) => {
  const {state ,dispatch} = useContext(storageContext);
  const {state: showAuthForm ,dispatch: setShowAuthForm} = useContext(AuthFormContext);
  const [cart, setCart] = useState<DArtCartDataType[]>(cartItems);
  const [session, setSession] = useState<Session | null>(null);

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
    dispatch({type: "STORAGE_UPDATED"});
  } 

  const handleRemoveProduct = (uuid: string) => {
    const newCartItems = cart.filter((item) => item.uuid !== uuid);
    setCart(newCartItems);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    dispatch({type: "STORAGE_UPDATED"})
  }

  const totalPrice = () => {
    const total = cart.reduce((total, item) => total + item.price, 0);
    return total;
  }
  const handlePurchase = async() => {
    const session = await getSession();
    if (!session) {
      setIsCartOpen(false);
      setShowAuthForm({type: "AuthFormOpened"})
      toast.error("You need to be logged in to purchase items");
      return;
    };
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: cart.map((item) => {
          return {
            price_id: item.price_id,
            quantity: item.nProduct
          }
        }),
      }),
    })
    const data = await res.json();
    localStorage.removeItem("cart");
    window.location.assign(data)
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-40 z-50 animate-fadeIn">
      <div className="fixed bottom-0 flex flex-col w-full min-h-[300px] z-[51] bg-primary overflow-x-hidden overflow-y-auto rounded-lg animate-slideUpAndFade md:animate-slideLeftAndFade md:top-6 md:right-8 md:w-96 md:h-full">
        {(cart.length < 1) ? (
          <header className="flex flex-col items-start">
            <div className="w-full flex items-center justify-between mb-6 px-6 border-b border-whiteAlpha3">
              <div className="flex py-4 items-center space-x-2">
                <h3 className="text-lg font-semibold">Your cart</h3>
                <BsExclamationCircle className="text-lg font-semibold text-whiteAlpha8"/>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="bg-transparent border-none outline-none text-xl text-white cursor-pointer hover:text-whiteAlpha8">
                <RxCross2 />
              </button>
            </div>
            <div className="flex items-center justify-center w-full mt-16">
              <h3 className="text-base font-medium text-secondary">Add items to get started.</h3>
            </div>
          </header>
        ): (
          <>
            <header className="flex flex-col items-start">
              <div className="w-full flex items-center justify-between mb-6 px-6 border-b border-whiteAlpha3">
                <div className="flex py-4 items-center space-x-2">
                  <h3 className="text-lg font-semibold">Your cart</h3>
                  <BsExclamationCircle className="text-lg font-semibold text-whiteAlpha8"/>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="bg-transparent border-none outline-none text-xl text-white cursor-pointer hover:text-whiteAlpha8">
                  <RxCross2 />
                </button>
              </div>
              <div className="flex w-full px-6 mb-4 items-center justify-between">
                <span className="text-base font-semibold">{cart.length} item</span>
                <button onClick={handleClearCart} className="bg-transparent border-none outline-none text-base font-semibold text-white cursor-pointer hover:text-whiteAlpha8">Clear all</button>
              </div>
            </header>
            <ul className="flex flex-col px-4 pb-6 space-y-2 border-b border-whiteAlpha3 mb-6">
              {cart.map((item, index) => (
                <div key={index} className="group flex w-full items-center justify-between p-2 rounded-lg hover:bg-whiteAlpha1">
                  <Link href={`/art/${item.uuid}`} passHref>
                    <div className="flex items-center space-x-4">
                      <div className="relative overflow-hidden h-[72px] w-[72px] rounded-lg">
                        <Image 
                          alt={item.name} 
                          src={item.imgUrl}
                          fill
                          style={{
                            objectFit: "cover",
                          }}
                          />
                      </div>
                      <div className="flex flex-col items-start space-y-1">
                        <h3 className="text-base font-semibold">{item.name}</h3>
                        <p className="text-sm">{item.description.slice(0, 20)}...</p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-center space-x-1">
                    <h3 className="flex items-center text-base font-medium group-hover:hidden">
                      <FaDollarSign />{item.price}
                    </h3>
                    <FaRegTrashAlt onClick={() => handleRemoveProduct(item.uuid)} className="text-lg font-bold text-white hover:text-whiteAlpha8 cursor-pointer hidden group-hover:block"/>
                  </div>
                </div>
              ))}
            </ul>
            <div className="flex w-full px-6 justify-between mb-6">
              <h3 className="text-base font-medium">Total price</h3>
              <h3 className="flex items-center">
                <FaDollarSign /> {totalPrice()}
              </h3>
            </div>
            <div className="flex flex-col items-start px-6 space-y-4 mb-8">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-base font-medium">Payment method</h3>
                <span className="text-lg font-medium">Stripe</span>
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center space-x-2">
                  <label className="flex items-center gap-1">
                    <input type="radio" name="option" value="1" checked className="hidden"/>
                    <span className="w-6 h-6 rounded-full border border-info6 flex items-center justify-center">
                      <span className="w-3 h-3 rounded-full bg-info6"></span>
                    </span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <FaStripe className="text-4xl text-white" />
                    <span className="text-base font-medium">Payment gateway</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full px-6 mb-16">
              <button onClick={handlePurchase} className="w-full py-4 rounded-xl bg-bacBuyButton text-white font-semibold text-base transition-colors duration-200 hover:bg-bacBuyButtonHover">
                Complete purchase
              </button>
            </div>
          </>
          )}
      </div>
    </div>
  )
}

export default CartMenu