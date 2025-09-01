import { TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "@components/atoms";
import { Button } from "@components/molecules";
import { BottomTabsProps, TabItem } from "./BottomTabs.types";
import { useAppTheme } from "../../../theme/utils";

export default function BottomTabs({ tabs, onTabPress }: BottomTabsProps) {
  const { theme } = useAppTheme();

  const containerStyle = {
    ...styles.container,
    backgroundColor: theme.colors.surface,
    borderTopColor: theme.colors.textSecondary,
    paddingVertical: theme.spacing.sm,
  };

  return (
    <View style={containerStyle}>
      {tabs.map((tab) => (
        <Button onPress={() => onTabPress(tab.key)} style={styles.button} key={tab.key}>
          <Icon 
            library={tab.iconProps?.library ?? "ionicons"} 
            name={tab.iconProps?.name ?? ""} 
            customStyles={{
              color: tab.isActive ? "primary" : "textSecondary",
              size: theme.fontSizes.xl
            }}
          />
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
  },
  button: {
    alignItems: "center",
  },
});
