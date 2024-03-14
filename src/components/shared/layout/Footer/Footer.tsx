import Link from "next/link";
import { BsTwitterX, BsInstagram, BsDiscord, BsYoutube } from "react-icons/bs";
import { FaRedditAlien, FaTiktok } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="footer" className="w-full px-8 md:px-16 py-16 bg-whiteAlpha0">
      <div className="flex flex-col items-start gap-8">
        <div className="w-full flex flex-col justify-between gap-16 md:flex-row">
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-white text-2xl font-semibold leading-snug tracking-tighter">Follow our latest news</h2>
            <p className="text-secondary text-base font-medium leading-relaxed tracking-wider">
              Join our mailing list to stay in the loop with our newest feature releases, Digital Arts drops, and tips and tricks for navigating DiArt.
            </p>
            <div className="w-full flex gap-2 md:pr-2">
              <input className="bg-transparent outline-none rounded-lg border border-whiteAlpha8 h-6 w-full text-base py-5 px-3 transition-all duration-200 ease-in-out text-white focus:border-white" type="email" placeholder="Your email address" />
              <button className="outline-none border-none bg-gradient-primary px-4 py-[10px] rounded-lg text-white text-base cursor-pointer font-semibold hover:bg-gradient-primary-hover">Subscribe</button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <h3 className="text-white text-2xl font-semibold leading-snug tracking-tighter">
              Join the community
            </h3>
            <div className="flex flex-wrap items-center gap-4 pl-1 md:gap-2 ">
              <button className="bg-gradient-primary-1 border-none outline-none rounded-xl px-6 py-3 cursor-pointer transition-all duration-200 ease-in-out hover:bg-gradient-primary-2">
                <BsTwitterX size={28} color="white" />
              </button>
              <button className="bg-gradient-primary-1 border-none outline-none rounded-xl px-6 py-3 cursor-pointer transition-all duration-200 ease-in-out hover:bg-gradient-primary-2">
                <BsInstagram size={28} color="white" />
              </button>
              <button className="bg-gradient-primary-1 border-none outline-none rounded-xl px-6 py-3 cursor-pointer transition-all duration-200 ease-in-out hover:bg-gradient-primary-2">
                <BsDiscord size={28} color="white" />
              </button>
              <button className="bg-gradient-primary-1 border-none outline-none rounded-xl px-6 py-3 cursor-pointer transition-all duration-200 ease-in-out hover:bg-gradient-primary-2">
                <FaRedditAlien size={28} color="white" />
              </button>
              <button className="bg-gradient-primary-1 border-none outline-none rounded-xl px-6 py-3 cursor-pointer transition-all duration-200 ease-in-out hover:bg-gradient-primary-2">
                <BsYoutube size={28} color="white" />
              </button>
              <button className="bg-gradient-primary-1 border-none outline-none rounded-xl px-6 py-3 cursor-pointer transition-all duration-200 ease-in-out hover:bg-gradient-primary-2">
                <FaTiktok size={28} color="white" />
              </button>
              <button className="bg-gradient-primary-1 border-none outline-none rounded-xl px-6 py-3 cursor-pointer transition-all duration-200 ease-in-out hover:bg-gradient-primary-2">
                <MdOutlineEmail size={28} color="white" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 w-full">
          <div className="flex items-center w-full">
            <Link href="/" passHref>
              <div className="flex items-center overflow-hidden">
                <Image
                  src="/images/diart-logo.png"
                  alt="diart logo"
                  quality={100}
                  width={141}
                  height={100}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Link>

          </div>
          <div className="flex flex-col w-full items-start gap-8 md:flex-row md:justify-between">
            <div className="flex items-center">
              <p className="text-base text-whiteAlpha75 font-light">© {currentYear} Diart, Inc</p>
            </div>
            <div className="flex items-center gap-12 pr-2">
              <p className="text-sm text-whiteAlpha75 cursor-pointer font-light hover:text-white hover:font-medium">Privacy Policy</p>
              <p className="text-sm text-whiteAlpha75 cursor-pointer font-light hover:text-white hover:font-medium">Terms of Service</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer