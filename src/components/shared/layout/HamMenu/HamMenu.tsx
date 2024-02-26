"use client"
import React, { Dispatch, SetStateAction } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import styles from  "./HamMenu.module.css";
import { IoMdCreate } from "react-icons/io";
import { Session } from "next-auth";
import { CgProfile } from "react-icons/cg";
import { signOut } from "next-auth/react";
import { MdOutlineWallet } from "react-icons/md";
import Link from "next/link";
import { AuthFormActionType } from "@/state/authpopupContext/AuthPopupContext";
import { SiHiveBlockchain } from "react-icons/si";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { FiActivity } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";


type Props = {
  session: Session | null;
  showForm: boolean;
  setShowForm: Dispatch<AuthFormActionType>;
  imgUrl?: string;
  homeMenu?: boolean;
}

const HamMenu = ({session, setShowForm, showForm, homeMenu, imgUrl}: Props) => {

  return (
    <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button
        className="rounded-lg w-[46px] h-[38px] inline-flex items-center justify-center text-white bg-gradient-primary-1 outline-none  hover:bg-gradient-primary-3"
        aria-label="Customise options"
      >
        <HamburgerMenuIcon /> 
      </button>
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className="z-[101] min-w-[220px] bg-white rounded-md p-[2px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        sideOffset={5}
      >
      {session && (
        <DropdownMenu.Item className="group text-sm leading-none text-primary rounded-[3px] flex items-center h-[25px] relative p-6 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-50 data-[highlighted]:text-blackAlpha7 hover:opacity-80">
            <Link
              href={session ? "/account" : "/"}
              className="w-full no-underline text-primary flex items-center gap-2"
              passHref
            >
              <CgProfile size={18} />
              <span className="text-base font-medium">Account</span>
            </Link>
        </DropdownMenu.Item>
      )}
        <DropdownMenu.Separator className="pl-4 h-[1px] bg-gray-300" />
        <DropdownMenu.Item className="group text-sm leading-none text-primary rounded-[3px] flex items-center h-[25px] relative p-6 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-50 data-[highlighted]:text-blackAlpha7 hover:opacity-80">
          <Link
            href={session ? "/arts" : "/"}
            className="w-full no-underline text-primary flex items-center gap-2"
            passHref
          >
            <SiHiveBlockchain size={18} />
            <span className="text-base font-medium">Arts</span>
          </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="pl-4 h-[1px] bg-gray-300" />
      <DropdownMenu.Item className="group text-sm leading-none text-primary rounded-[3px] flex items-center h-[25px] relative p-6 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-50 data-[highlighted]:text-blackAlpha7 hover:opacity-80">
          <Link
            href={session ? "/marketplace" : "/"}
            className="w-full no-underline text-primary flex items-center gap-2"
            passHref
          >
            <RiShoppingBag3Fill size={18} />
            <span className="text-base font-medium">Marketplace</span>
          </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="pl-4 h-[1px] bg-gray-300" />
      <DropdownMenu.Item className="group text-sm leading-none text-primary rounded-[3px] flex items-center h-[25px] relative p-6 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-50 data-[highlighted]:text-blackAlpha7 hover:opacity-80">
          <Link
            href={session ? "/create" : "/"}
            className="w-full no-underline text-primary flex items-center gap-2"
            passHref
          >
            <IoMdCreate size={18} />
            <span className="text-base font-medium">Create</span>
          </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="pl-4 h-[1px] bg-gray-300" />
      <DropdownMenu.Item className="group text-sm leading-none text-primary rounded-[3px] flex items-center h-[25px] relative p-6 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-50 data-[highlighted]:text-blackAlpha7 hover:opacity-80">
          <Link
            href={session ? "/activity" : "/"}
            className="w-full no-underline text-primary flex items-center gap-2"
            passHref
          >
            <FiActivity size={18} />
            <span className="text-base font-medium">Activity</span>
          </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="pl-4 h-[1px] bg-gray-300" />
      <DropdownMenu.Item className="group text-sm leading-none text-primary rounded-[3px] flex items-center h-[25px] relative p-6 select-none outline-none data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-50 data-[highlighted]:text-blackAlpha7 hover:opacity-80">
        {session ? (
          <button
            type="button"
            className="w-full no-underline text-primary flex items-center gap-2"
            onClick={() => signOut()}
            >
              <TbLogout className="font-semibold" size={18} />
              <span className="text-base font-medium">Logout</span>
          </button>
        ): (
          <button
            type="button"
            className="w-full no-underline text-primary flex items-center gap-2"
            onClick={() => setShowForm(showForm ? {type: "AuthFormClosed"}: {type: "AuthFormOpened"})}
          >
            <MdOutlineWallet size={16} color="white" />
            <span className="text-base font-medium">Login</span>
          </button>
        )}
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="pl-4 h-[1px] bg-gray-300" />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
  );
};

export default HamMenu;















{/* <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.IconButton} aria-label="Customise options">
          <HamburgerMenuIcon style={{ color: "white"}} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.DropdownMenuContent} sideOffset={5}>
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            <Link
              href={session ? "/account" : "/"}
              className={styles.HamMenuItemLink}
              passHref
            >
              <CgProfile size={16} />
              <span className={styles.HamMenuItemText}>Account</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            <Link
              href="/arts"
              className={styles.HamMenuItemLink}
              passHref
            >
              <SiHiveBlockchain size={16} />
              <span className={styles.HamMenuItemText}>Arts</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            <Link
              href="/marketplace"
              className={styles.HamMenuItemLink}
              passHref
            >
              <RiShoppingBag3Fill size={16} />
              <span className={styles.HamMenuItemText}>MarketPlace</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            <Link
              href="/create"
              className={styles.HamMenuItemLink}
              passHref
            >
              <IoMdCreate size={16} />
              <span className={styles.HamMenuItemText}>Create</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            <Link
              href="/activity"
              className={styles.HamMenuItemLink}
              passHref
            >
              <FiActivity size={16} />
              <span className={styles.HamMenuItemText}>Activity</span>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.DropdownMenuItem}>
            {session ? (
              <button
                type="button"
                style={{ border: "none", backgroundColor: "transparent", display: "flex", alignItems: "center",
                gap: "4px", cursor: "pointer", width: "100%"}}
                onClick={() => signOut()}
                >
                  <IoIosLogOut size={16} />
                  <span className={styles.HamMenuItemText}>Logout</span>
              </button>
            ): (
              <button
                type="button"
                style={{ border: "none", backgroundColor: "transparent", display: "flex", alignItems: "center", gap: "4px"}}
                onClick={() => setShowForm(showForm ? {type: "AuthFormClosed"}: {type: "AuthFormOpened"})}
              >
                <MdOutlineWallet size={16} color="white" />
                <span>Login</span>
              </button>
            )}
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root> */}