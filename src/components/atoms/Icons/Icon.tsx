import React, { useMemo } from "react";
import { Animated } from "react-native";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { defaultTheme } from "@theme/themes";
import { ThemeColors } from "@theme/types";
import { iconLibraries, IconProps, IconStyleProps, IconVariant } from "./Icon.types";
import { getMergedStyles, useAppTheme } from "@theme/utils";
import { defaultIconStyles } from "./Icon.styles";

const Icon = ({ library, name, animated = false, customStyles, variant, ...props }: IconProps) => {
  const { theme } = useAppTheme();
  const SelectedLib = iconLibraries[library];

  if (!SelectedLib) {
    console.error(`Icon library "${library}" not supported`);
    return null;
  }

  const merged = useMemo(
    () => getMergedStyles<IconStyleProps, IconVariant>(theme, "Input", defaultIconStyles(theme), variant, customStyles),
    [theme, variant, customStyles]
  );

  const Component = animated ? Animated.createAnimatedComponent(SelectedLib) : SelectedLib;

  return (
    <Component
      name={name}
      size={merged.size}
      color={merged.color ? defaultTheme.colors[merged.color] : undefined}
      style={merged.containerStyle}
      {...props}
    />
  );
};

export default Icon;
