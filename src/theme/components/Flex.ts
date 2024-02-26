import { styled } from "../stitches.config";

export const Flex = styled("div", {
  display: "flex",
  boxSizing: "border-box",
  width: "$full",

  variants: {
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
      rowReverse: {
        flexDirection: "row-reverse",
      },
      columsReverse: {
        flexDirection: "row",
      },
    },
    align: {
      start: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "flex-end",
      },
      stretch: {
        alignItems: "stretch",
      },
      baseline: {
        alignItems: "baseline",
      },
    },
    justify: {
      start: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "flex-end",
      },
      stretch: {
        justifyContent: "stretch",
      },
      between: {
        justifyContent: "space-between",
      },
    },
    wrap: {
      noWrap: {
        flexWrap: "nowrap",
      },
      wrap: {
        flexWrap: "wrap",
      },
      wrapReverse: {
        flexWrap: "wrap-reverse",
      },
    },
    gap: {
      0: {
        gap: 0,
      },
      1: {
        gap: "$1",
      },
      2: {
        gap: "$2",
      },
      3: {
        gap: "$3",
      },
      4: {
        gap: "$4",
      },
      5: {
        gap: "$5",
      },
      6: {
        gap: "$6",
      },
      7: {
        gap: "$7",
      },
      8: {
        gap: "$8",
      },
      9: {
        gap: "$9",
      },
      10: {
        gap: "$10",
      },
      12: {
        gap: "$12",
      },
      16: {
        gap: "$16",
      },
      20: {
        gap: "$20",
      },
      24: {
        gap: "$24",
      },
    },
    flex: {
      unset: {
        flex: "unset",
      },
      1: {
        flex: 1,
      },
      2: {
        flex: 2,
      },
      3: {
        flex: 3,
      },
      4: {
        flex: 4,
      },
      5: {
        flex: 5,
      },
      6: {
        flex: 6,
      },
    },
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
        maxWidth: "xxl",
      },
      "6": {
        maxWidth: "none",
      },
    },
  },
  defaultVariants: {
    flex: "unset",
    direction: "row",
    align: "stretch",
    justify: "start",
    wrap: "noWrap",
    size: "6",
    gap: "2",
  },
});
