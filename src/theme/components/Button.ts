import { styled } from "../stitches.config";

export const Button = styled("button", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxSizing: "border-box",
  textDecoration: "inherit",
  color: "inherit",
  flexShrink: 0,
  paddingX: "$8",
  paddingY: "$4",
  gap: "$2",
  fontFamily: "$sofia",
  fontSize: "$4",
  fontWeight: 500,
  textAlign: "center",
  borderRadius: "$2",
  transition: "all 0.2s ease",

  "&::before": {
    boxSizing: "border-box",
  },

  "&::after": {
    boxSizing: "border-box",
  },

  svg: {
    transition: "all 0.2s ease",
  },

  "&:disabled": {
    pointerEvents: "none",
    cursor: "not-allowed",
    backgroundColor: "$neutral2",
    color: "$neutral3",
  },

  variants: {
    aspect: {
      default: {
        aspectRatio: "unset",
      },
      square: {
        aspectRatio: "1 / 1",
        padding: "$4",
      },
    },
    size: {
      sm: {
        fontSize: "$2",
      },
      md: {
        fontSize: "$4",
      },
      xl: {
        fontSize: "$5",
      },
    },
    width: {
      full: {
        width: "$full",
      },
      fitContent: {
        width: "fit-content",
      },
      half: {
        width: "50%",
      },
    },
    color: {
      primary: {
        color: "$secondary",
        backgroundColor: "$primaryGradient1",
        borderRadius: "$4",

        "&:hover": {
          backgroundColor: "$primaryGradient2",
        },
      },
      white: {
        color: "$secondary",
        backgroundColor: "transparent",
        borderRadius: "$4",

        "&:hover": {
          backgroundColor: "$white",
          color: "$primary2",
        },
      },
      pg: {
        backgroundColor: "$primaryGradient",
        borderRadius: "$4",
        border: "1px solid $primaryGradient",
        "&:hover": {
          color: "$secondary",
          backgroundColor: "$tertiaryGradient",
        },
      },
      pgbc: {
        color: "$secondary",
        backgroundColor: "$primaryGradient",
        borderRadius: "$4",

        "&:hover": {
          backgroundColor: "$tertiaryGradient",
        },
      },
    },
  },

  defaultVariants: {
    aspect: "default",
    size: "md",
    color: "primary",
    width: "fitContent",
  },
});
