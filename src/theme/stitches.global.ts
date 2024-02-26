import { globalCss } from "./stitches.config";
export const globalStyles = globalCss({
  html: {
    maxWidth: "100vw",
    scrollBehavior: "smooth",
    overflowX: "hidden",
  },
  body: {
    margin: 0,
    backgroundColor: "$primary",
    color: "$white",
    fontFamily: "$poppins",
  },
  svg: {
    display: "block",
  },
  "::selection": {
    backgroundColor: "$secondary3",
    color: "$white",
  },
});
