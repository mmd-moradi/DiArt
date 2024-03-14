"use client"
import { MdOutlineShoppingCart } from "react-icons/md"
import { useContext, useEffect, useState } from "react";
import { DArtCartDataType } from "@/components/Art/ArtInfo/ArtInfo";
import { storageContext } from "@/state/storageContext/StorageContext";
import CartMenu from "../layout/CartMenu/CartMenu";


const CartButton = () => {
  const {state, dispatch} = useContext(storageContext);
  const [cart, setCart] = useState<DArtCartDataType[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    const cartStorageJson = localStorage.getItem("cart");
    const cartData = cartStorageJson ? JSON.parse(cartStorageJson) : [];
    setCart(cartData);
  }, [state]);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  }

  return (
    <>
      {isCartOpen && (
        <CartMenu cartItems={cart} setIsCartOpen={setIsCartOpen} />
      )}  
      <button onClick={handleCartClick} className="flex items-center gap-2 rounded-lg bg-gradient-primary-1 px-3 py-2 outline-none border-none cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-primary-3" type="button">
        <MdOutlineShoppingCart className="text-white text-[22px] md:text-[28px]" />
        {cart && cart.length > 0 && 
          <div className="mt-[-20px] ml-[-20px] flex items-center justify-center w-4 h-4 rounded-full bg-info6 text-white text-xs font-semibold">
            {cart.length}
          </div>
        }
      </button>
    </>
  )
}

export default CartButton