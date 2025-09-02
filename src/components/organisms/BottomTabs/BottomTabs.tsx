import { View } from "react-native";
import React, { useMemo } from "react";
import { Icon } from "@components/atoms";
import { Button } from "@components/molecules";
import { BottomTabsProps, TabItem, BottomTabsStyleProps } from "./BottomTabs.types";
import { useAppTheme } from "../../../theme/utils";
import { defaultBottomTabsStyles } from "./BottomTabs.styles";
import { getMergedStyles } from "../../../theme/utils";

export default function BottomTabs({ tabs, onTabPress, customStyles }: BottomTabsProps & { customStyles?: Partial<BottomTabsStyleProps> }) {
  const { theme } = useAppTheme();

  const mergedStyles = useMemo(
    () => getMergedStyles<BottomTabsStyleProps>(
      theme,
      "BottomTabs",
      defaultBottomTabsStyles(theme),
      undefined,
      customStyles
    ),
    [theme, customStyles]
  );

  return (
    <View style={mergedStyles.container}>
      {tabs.map((tab) => (
        <Button 
          onPress={() => onTabPress(tab.key)} 
          style={mergedStyles.button} 
          key={tab.key}
        >
          <Icon 
            library={tab.iconProps?.library ?? "ionicons"} 
            name={tab.iconProps?.name ?? ""} 
            customStyles={tab.isActive ? mergedStyles.activeIcon : mergedStyles.icon}
          />
        </Button>
      ))}
    </View>
  );
}
