"use client"
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsTextLeft } from "react-icons/bs";
import {FaPlus, FaDollarSign } from "react-icons/fa"

import { FaRegClock } from "react-icons/fa6";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { FaMinus } from "react-icons/fa6";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { storageContext } from "@/state/storageContext/StorageContext";
import { getSession } from "next-auth/react";
import { AuthFormContext } from "@/state/authpopupContext/AuthPopupContext";

export type DArtCartDataType = {
  name: string;
  ownerUsername: string;
  nProduct: number;
  maxProduct: number;
  uuid: string;
  description: string;
  imgUrl: string;
  price: number;
  price_id: string;
}

type Props = {
  dArtName: string;
  ownerName: string;
  createdAt: string;
  price: number;
  description: string;
  nDarts: number;
  imgUrl: string;
  uuid: string;
  price_id: string;
}

const ArtInfo = ({
  createdAt,
  ownerName,
  dArtName,
  description,
  price,
  nDarts,
  imgUrl,
  uuid,
  price_id
}: Props) => {
  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [realPrice, setRealPrice] = useState<number>(price);
  const { state, dispatch } = useContext(storageContext);
  const {state: showAuthForm ,dispatch: setShowAuthForm} = useContext(AuthFormContext);
  const handleIncrease = () => {
    if(quantity < nDarts) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      setRealPrice(price * newQuantity);
    }
  }
  
  const handleDecrease = () => {
    if(quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setRealPrice(price * newQuantity);
    }
  }
  const addtoCart = () => {
    const cartStorage = localStorage.getItem("cart");
    let cartData: DArtCartDataType[] = cartStorage? JSON.parse(cartStorage):[];
    const existingProductIndex = cartData.findIndex((item) => item.uuid === uuid);
    if(existingProductIndex !== -1) {
      if(cartData[existingProductIndex].nProduct + quantity <= nDarts) {
        cartData[existingProductIndex].nProduct += quantity;
      } else {
        toast.error("You can't add more than the available quantity");
        return;
      }
    } else {
      cartData.push({
        name: dArtName,
        ownerUsername: ownerName,
        nProduct: quantity,
        maxProduct: nDarts,
        uuid: uuid,
        description: description,
        imgUrl: imgUrl,
        price: realPrice,
        price_id: price_id
      })
    }
    localStorage.setItem("cart", JSON.stringify(cartData));
    dispatch({type: "STORAGE_UPDATED"})
    toast.success("Added to cart");
  }

  const buyNowFn = async() => {
    const session = await getSession();
    if (!session) {
      setShowAuthForm({type: "AuthFormOpened"})
      toast.error("You need to be logged in to purchase items");
      return;
    }
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [{
          price_id: price_id,
          quantity: quantity
        }]
      }),
    })
    const data = await res.json();
    localStorage.removeItem("cart");
    window.location.assign(data)
  }
  return (
    <div className="w-full h-[600px] py-3 flex flex-col items-start justify-start">
      <div className="w-full flex flex-col items-start justify-start">
        <div className="flex flex-col items-start justify-start text-white mb-4">
          <h1 className="text-3xl font-semibold mb-2 md:text-3xl">{dArtName}</h1>
        </div>
        <div className="flex flex-col items-start justify-start text-white mb-4">
          <span className="text-lg font-semibold mb-2">Owned by <span className="text-info5 hover:text-info6">{ownerName}</span></span>
        </div>
      </div>
      <div className="rounded-lg w-full flex flex-col items-start justify-start bg-gradient-primary-bac border border-whiteAlpha2 mb-4">
        <div className="w-full flex items-center justify-start gap-2 p-5 border-b border-b-whiteAlpha3">
          <FaRegClock size={20} />
          <span className="text-base font-medium text-white">Created At {formattedDate}</span>
        </div>
        <div className="w-full p-5 flex flex-col items-start justify-start">
          <div className="flex w-full items-center">
            <div className="flex-1 flex items-center justify-start">
              <span className="text-xl font-medium text-gray-200 mb-4">Current price</span>
            </div>
            <div className="flex-1 flex items-center justify-end md:justify-start">
              <span className="flex items-center text-[28px] font-semibold text-white mb-4"><FaDollarSign />{realPrice}</span>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-6 md:flex-row md:items-center">
            <div className="w-full h-full flex items-center justify-start rounded-lg bg-bacBuyButton overflow-hidden md:flex-1">
              <div className="flex items-center justify-center flex-[1.7] bg-transparent border-r border-opacity-50 hover:bg-bacBuyButtonHover">
                <button
                  onClick={buyNowFn}
                  className="w-full bg-transparent py-6 px-3 flex justify-center items-center text-center border-none text-xl
                  font-semibold text-white cursor-pointer md:py-4"
                  >
                    Buy now
                </button>
              </div>
              <div className="flex items-center justify-center h-full flex-[0.3] bg-transparent hover:bg-bacBuyButtonHover">
                <button onClick={addtoCart} className="w-full py-2 px-3 text-3xl flex justify-center items-center text-center bg-transparent border-none text-white cursor-pointer"><MdOutlineShoppingCart /></button>
              </div>
            </div>
            <div className="w-full flex items-center justify-start rounded-lg bg-gradient-primary-3 h-full border border-whiteAlpha2 md:flex-1">
              <div className="flex items-center justify-center flex-[0.5]">
                <button
                  className="flex justify-start items-center bg-transparent border-none text-3xl text-white cursor-pointer"
                  onClick={handleDecrease}
                >
                  <FaMinus className="text-2xl text-white font-bold hover:text-opacity-80" />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center text-xl font-semibold  text-white">{quantity} of {nDarts}</div>
              <div className="flex items-center justify-center flex-[0.5]">
                <button
                  className="flex justify-start items-center bg-transparent border-none text-2xl text-white cursor-pointer"
                  onClick={handleIncrease}
                  >
                  <FaPlus className="text-xl text-white font-medium hover:text-opacity-80" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg w-full flex flex-col items-start justify-start bg-gradient-primary-bac border border-whiteAlpha2">
        <div className="w-full p-5 flex items-center justify-start gap-2 text-white border-b border-whiteAlpha3">
          <BsTextLeft className="text-xl text-white" />
          <span className="text-xl font-semibold leading-5 text-white">Description</span>
        </div>
          <div className="p-5 px-7 flex flex-col gap-4 overflow-y-auto max-h-52">
            <p className="text-sm leading-6 text-white md:text-base">{description}</p>
          </div>
      </div>
    </div>
  )
}

export default ArtInfo