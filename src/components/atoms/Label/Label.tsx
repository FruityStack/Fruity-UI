import React, { useMemo } from "react";
import { Text, StyleSheet } from "react-native";

import { useAppTheme, getMergedStyles } from "@theme/utils";

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
        base: {
          ...merged.base,
        },
      }),
    [merged]
  );

  return (
    <Text selectable={selectable} numberOfLines={numberOfLines} style={[styles.base]} {...props}>
      {children}
    </Text>
  );
};

export default Label;