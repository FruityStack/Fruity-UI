import React, { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

import { useAppTheme, getMergedStyles } from "../../../theme/utils";

import { LabelProps, LabelStyleProps, LabelVariant } from "./Label.types";
import { defaultLabelStyles } from "./Label.styles";

const Label = ({ children, variant = "default", numberOfLines, selectable = false, customStyle, ...props }: LabelProps) => {
  const { theme } = useAppTheme();

  const merged = useMemo(
    () => getMergedStyles<LabelStyleProps, LabelVariant>(theme, "Label", defaultLabelStyles(theme), variant, customStyle),
    [theme, variant, customStyle]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        merged,
      }),
    [merged]
  );

  return (
    <Text selectable={selectable} numberOfLines={numberOfLines} style={[styles.merged]} {...props}>
      {children}
    </Text>
  );
};

export default Label;
