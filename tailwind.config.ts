import type { Config } from "tailwindcss";

/** @type {import("tailwindcss").Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)"],
      },
      colors: {
        primary: "#181723",
        secondary: "#D7D7D7",
        primary2: "#2D2B42",
        primary3: "#1a182d",
        secondary2: "#41305A",
        secondary3: "#59427B",
        tertiary: "#FB37FF",
        tertiary2: "#1BB2DE",
        tertiary3: "#676774",
        bacBuyButton: "#3081ED",
        bacBuyButtonHover: "#3d8ef7",
        neutral0: "#F7F9FD",
        neutral1: "#E7EEFA",
        neutral2: "#D1DDF6",
        neutral3: "#B1C1E5",
        neutral4: "#92A2CC",
        whiteAlpha0: "rgba(255, 255, 255, 0.04)",
        whiteAlpha1: "rgba(255, 255, 255, 0.06)",
        whiteAlpha2: "rgba(255, 255, 255, 0.08)",
        whiteAlpha3: "rgba(255, 255, 255, 0.16)",
        whiteAlpha4: "rgba(255, 255, 255, 0.24)",
        whiteAlpha5: "rgba(255, 255, 255, 0.36)",
        whiteAlpha6: "rgba(255, 255, 255, 0.48)",
        whiteAlpha7: "rgba(255, 255, 255, 0.64)",
        whiteAlpha8: "rgba(255, 255, 255, 0.80)",
        whiteAlpha9: "rgba(255, 255, 255, 0.92)",
        blackAlpha0: "rgba(0, 0, 0, 0.04)",
        blackAlpha1: "rgba(0, 0, 0, 0.06)",
        blackAlpha2: "rgba(0, 0, 0, 0.08)",
        blackAlpha3: "rgba(0, 0, 0, 0.16)",
        blackAlpha4: "rgba(0, 0, 0, 0.24)",
        blackAlpha5: "rgba(0, 0, 0, 0.36)",
        blackAlpha6: "rgba(0, 0, 0, 0.48)",
        blackAlpha7: "rgba(0, 0, 0, 0.64)",
        blackAlpha8: "rgba(0, 0, 0, 0.80)",
        blackAlpha9: "rgba(0, 0, 0, 0.92)",
        dangerInput: "#FF035E",
        dangerText: "#FF6B6B",
        warning: "#FFEB11",
        info: "#02A4FC",
        success: "#53DB77",
        danger1: "#FFCECC",
        danger2: "#FF9AA0",
        danger3: "#FF6780",
        danger4: "#FF4173",
        danger5: "#FF035E",
        danger6: "#DB0266",
        danger7: "#B70167",
        danger8: "#930061",
        danger9: "#7A005C",
        warning1: "#FFFCCF",
        warning2: "#FFF99F",
        warning3: "#FFF570",
        warning4: "#FFF14C",
        warning5: "#FFEB11",
        warning6: "#DBC80C",
        warning7: "#B7A508",
        warning8: "#938405",
        warning9: "#7A6C03",
        info1: "#CCF9FE",
        info2: "#99EEFE",
        info3: "#66DBFE",
        info4: "#40C6FD",
        info5: "#02A4FC",
        info6: "#017FD8",
        info7: "#015FB5",
        info8: "#004392",
        info9: "#003078",
        success1: "#E1FDDD",
        success2: "#BEFBBC",
        success3: "#99F49F",
        success4: "#7CE98E",
        success5: "#53DB77",
        success6: "#3CBC6A",
        success7: "#299D5E",
        success8: "#1A7F52",
        success9: "#0F694A",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(94deg, #9B51E0 2.91%, #3081ED 50.92%)",
        "gradient-primary-hover":
          "linear-gradient(94deg, #8949c5 2.91%, #2974b2 50.92%)",
        "gradient-secondary":
          "linear-gradient(169deg, #FB37FF 1.7%, rgba(155, 111, 238, 0.00) 51.82%, rgba(123, 127, 234, 0.00) 56.52%, rgba(123, 127, 234, 0.00) 56.68%, #1BB2DE 99.52%)",
        "gradient-primary-bac":
          "linear-gradient(169deg, rgba(58, 129, 191, 0.1) 1.85%, rgba(65, 48, 90, 0.3) 98.72%)",
        "gradient-primary-0":
          "linear-gradient(169deg, rgba(58, 129, 191, 0.1) 1.85%, rgba(65, 48, 90, 0.2) 98.72%)",
        "gradient-primary-1":
          "linear-gradient(169deg, rgba(58, 129, 191, 0.1) 1.85%, rgba(65, 48, 90, 0.1) 98.72%)",
        "gradient-primary-2":
          "linear-gradient(169deg, rgba(58, 129, 191, 0.2) 1.85%, rgba(65, 48, 90, 0.2) 98.72%)",
        "gradient-primary-3":
          "linear-gradient(169deg, rgba(58, 129, 191, 0.3) 1.85%, rgba(65, 48, 90, 0.3) 98.72%)",
        "gradient-primary-4":
          "linear-gradient(169deg, rgba(58, 129, 191, 0.5) 1.85%, rgba(65, 48, 90, 0.5) 98.72%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        fadeIn: "fadeIn 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
