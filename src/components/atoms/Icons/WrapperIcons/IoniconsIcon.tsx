import React from "react";
import { Ionicons } from "@expo/vector-icons";
export type IconsStyles = "primary" | "secondary" | "tertiary";

export type Suffix = "" | "-outline" | "-sharp";

const styleSuffixMap: Record<string, Suffix> = {
  primary: "",
  secondary: "-outline",
  tertiary: "-sharp",
};

type IoniconsIconProps = {
  name: string;
  style?: string;
} & React.ComponentProps<typeof Ionicons>;

const IoniconsIcon = ({ name, style = "primary", ...props }: IoniconsIconProps) => {
  const suffix = styleSuffixMap[style] || "";
  const fullName = `${name}${suffix}`;

  return <Ionicons name={fullName as any} {...props} />;
};

export default IoniconsIcon;

