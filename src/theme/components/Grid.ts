import { styled } from "../stitches.config";

export const Grid = styled("div", {
  display: "grid",
  boxSizing: "border-box",
  width: "$full",
  variants: {
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
      between: {
        justifyContent: "space-between",
      },
    },
    flow: {
      row: {
        gridAutoFlow: "row",
      },
      column: {
        gridAutoFlow: "column",
      },
      rowDense: {
        gridAutoFlow: "row dense",
      },
      columnDense: {
        gridAutoFlow: "column dense",
      },
    },
    columns: {
      1: {
        gridTemplateColumns: "reapet(1, 1fr)",
      },
      2: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
      3: {
        gridTemplateColumns: "repeat(3, 1fr)",
      },
      4: {
        gridTemplateColumns: "repeat(4, 1fr)",
      },
    },
    gap: {
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
      10: {
        gap: "$10",
      },
      12: {
        gap: "$12",
      },
    },
    gapX: {
      1: {
        columnGap: "$1",
      },
      2: {
        columnGap: "$2",
      },
      3: {
        columnGap: "$3",
      },
      4: {
        columnGap: "$4",
      },
      5: {
        columnGap: "$5",
      },
      6: {
        columnGap: "$6",
      },
      7: {
        columnGap: "$7",
      },
      8: {
        columnGap: "$8",
      },
      10: {
        columnGap: "$10",
      },
      12: {
        columnGap: "$12",
      },
    },
    gapY: {
      1: {
        rowGap: "$1",
      },
      2: {
        rowGap: "$2",
      },
      3: {
        rowGap: "$3",
      },
      4: {
        rowGap: "$4",
      },
      5: {
        rowGap: "$5",
      },
      6: {
        rowGap: "$6",
      },
      7: {
        rowGap: "$7",
      },
      8: {
        rowGap: "$8",
      },
      10: {
        rowGap: "$10",
      },
      12: {
        rowGap: "$12",
      },
    },
  },
});
