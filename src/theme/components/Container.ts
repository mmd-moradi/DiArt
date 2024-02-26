import { styled } from "../stitches.config";

export const Container = styled("div", {
  boxSizing: "border-box",
  flexShrink: 0,
  marginX: "auto",
  marginY: "auto",
  width: "$full",

  variants: {
    size: {
      "1": {
        maxWidth: "$sm",
      },
      "2": {
        maxWidth: "$md",
      },
      "3": {
        maxWidth: "$lg",
      },
      "4": {
        maxWidth: "$xl",
      },
      "5": {
        maxWidth: "$xxl",
      },
      "6": {
        maxWidth: "none",
      },
    },
  },

  defaultVariants: {
    size: "4",
  },
});
