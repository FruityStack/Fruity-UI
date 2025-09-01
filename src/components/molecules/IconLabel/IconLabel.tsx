import { View, StyleSheet } from "react-native";
import { Label, Icon } from "../../atoms";
import { IconLabelProps } from "./IconLabel.types";

export const IconLabel: React.FC<IconLabelProps> = ({ iconProps, labelProps, spacing = 4, iconPosition = "left", containerStyle }) => {
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
