import type * as Stitches from "@stitches/react";

export const utils = {
  marginX: (value: Stitches.PropertyValue<"marginLeft">) => ({
    marginLeft: value,
    marginRight: value,
  }),
  marginY: (value: Stitches.PropertyValue<"marginTop">) => ({
    marginLeft: value,
    marginRight: value,
  }),
  paddingX: (value: Stitches.PropertyValue<"paddingRight">) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  paddingY: (value: Stitches.PropertyValue<"paddingTop">) => ({
    paddingTop: value,
    paddingBottom: value,
  }),
};
