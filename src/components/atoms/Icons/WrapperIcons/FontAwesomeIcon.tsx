import { FontAwesome5 } from "@expo/vector-icons";
import { defaultTheme } from "../../../../theme/themes";

type FontAwesomeIconProps = {
  name: string;
  variant?: "solid" | "regular" | "brand";
  color?: keyof typeof defaultTheme.colors;
  size?: number;
};

const FontAwesomeIcon = ({ name, variant = "solid", color = "primary", size = defaultTheme.fontSizes.md, ...props }: FontAwesomeIconProps) => {
  return (
    <FontAwesome5
      name={name}
      solid={variant === "solid"}
      regular={variant === "regular"}
      brand={variant === "brand"}
      color={defaultTheme.colors[color]}
      size={size}
      {...props}
    />
  );
};

export default FontAwesomeIcon;