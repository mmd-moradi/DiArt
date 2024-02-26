import type * as Stitches from "@stitches/react";
import { createStitches, defaultThemeMap } from "@stitches/react";
import { borderStyles } from "./foundations/borderStyles";
import { borderWidths } from "./foundations/borderWidths";
import { colors } from "./foundations/colors";
import { media } from "./foundations/media";
import { radii } from "./foundations/radii";
import { shadows } from "./foundations/shadows";
import { sizes } from "./foundations/sizes";
import { space } from "./foundations/space";
import { transitions } from "./foundations/transitions";
import {
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
} from "./foundations/typography";
import { utils } from "./foundations/utils";

export type { VariantProps } from "@stitches/react";
export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  createTheme,
  theme,
  config,
  reset,
} = createStitches({
  theme: {
    fonts,
    colors,
    space,
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacings,
    sizes,
    borderWidths,
    borderStyles,
    radii,
    shadows,
    transitions,
  },
  media,
  utils,
  themeMap: {
    ...defaultThemeMap,
    gradientStart: "colors",
    gradientEnd: "colors",
  },
});

export type CSS = Stitches.CSS<typeof config>;
