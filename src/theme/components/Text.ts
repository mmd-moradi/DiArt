import { styled } from "../stitches.config";

export const Text = styled("p", {
  margin: 0,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "pre-wrap",
  transition: "all 0.4 ease",

  variants: {
    size: {
      "1": {
        fontSize: "$1",
        lineHeight: "$1",
        letterSpacing: "default",
      },
      "2": {
        fontSize: "$2",
        lineHeight: "$2",
        letterSpacing: "default",
      },
      "3": {
        fontSize: "$3",
        lineHeight: "$3",
        letterSpacing: "default",
      },
      "4": {
        fontSize: "$4",
        lineHeight: "$4",
        letterSpacing: "default",
      },
      "5": {
        fontSize: "$5",
        lineHeight: "$5",
        letterSpacing: "default",
      },
      "6": {
        fontSize: "$6",
        lineHeight: "$6",
        letterSpacing: "$default",
      },
      "7": {
        fontSize: "$7",
        lineHeight: "$7",
        letterSpacing: "$default",
      },
      "8": {
        fontSize: "$8",
        lineHeight: "$8",
        letterSpacing: "$default",
      },
      "9": {
        fontSize: "$9",
        lineHeight: "$9",
      },
      "10": {
        fontSize: "$10",
        lineHeight: "$10",
      },
      "11": {
        fontSize: "$11",
        lineHeight: "$11",
      },
      "12": {
        fontSize: "$12",
        lineHeight: "$12",
      },
      "13": {
        fontSize: "$13",
        lineHeight: "$13",
      },
      "14": {
        fontSize: "$14",
        lineHeight: "$14",
      },
      "15": {
        fontSize: "$15",
        lineHeight: "$15",
      },
    },
    weight: {
      "300": {
        fontWeight: 300,
      },
      "400": {
        fontWeight: 400,
      },
      "500": {
        fontWeight: 500,
      },
      "600": {
        fontWeight: 600,
      },
      "700": {
        fontWeight: 700,
      },
      "900": {
        fontWeight: 900,
      },
    },
    color: {
      primary: {
        color: "$white",
      },
      secondary: {
        color: "$secondary",
      },
      teritary: {
        color: "$primary",
      },
      success: {
        color: "$success7",
      },
      warning: {
        color: "$warning",
      },
      info: {
        color: "$info",
      },
      danger: {
        color: "$danger",
      },
    },
    overline: {
      true: {
        textTransform: "uppercase",
        fontWeight: 600,
      },
      false: {
        textTransform: "unset",
      },
    },
    align: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
    },
    gradient: {
      true: {
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
    },
  },
  defaultVariants: {
    size: "3",
    weight: "500",
    color: "primary",
    align: "left",
    overline: "false",
  },
});
