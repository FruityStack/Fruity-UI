import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

type MaterialIconProps = {
  name: string;
  style?: "primary" | "secondary" | "tertiary";
} & React.ComponentProps<typeof MaterialIcons>;

const MaterialIcon = ({ name, style = "primary", ...props }: MaterialIconProps) => {
  return <MaterialIcons name={name} {...props} />;
};

export default MaterialIcon;
