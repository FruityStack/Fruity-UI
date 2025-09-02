import { Theme } from "../../../theme/types";
import { BentoGridStyleProps } from "./BentoGrid.types";

export const defaultBentoGridStyles = (theme: Theme): BentoGridStyleProps => ({
  container: {
    backgroundColor: "transparent",
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
