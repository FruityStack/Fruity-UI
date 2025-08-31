import { Icon } from "@components/atoms";
import React from "react";

type NotFoundIconProps = {
  name?: string;
};

const NotFoundIcon = ({ name = "warning" }: NotFoundIconProps) => {
  return <Icon library="ionicons" name={name} />;
};

export default NotFoundIcon;
