import { View, StyleSheet } from "react-native";

import { Label, Icon } from "@components/atoms";

import { IconLabelProps } from "./IconLabel.types";

export const IconLabel = ({ iconProps, labelProps, spacing = 4, iconPosition = "left", containerStyle }: IconLabelProps) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: iconPosition === "left" ? "row" : "row-reverse",
      alignItems: "center",
      gap: spacing,
      ...containerStyle,
    },
  });

  return (
    <View style={styles.container}>
      <Icon {...iconProps} />
      <Label {...labelProps} />
    </View>
  );
};

export default IconLabel;
